// Global variables
        let map;
        let issMarker;
        let currentOrbitLine;
        let futureOrbitLine;
        let currentOrbitPoints = [];
        let followISS = false;
        let totalDistance = 0;
        let lastUpdateTime = Date.now();
        let orbitsToday = 0;
        // Timestamp for start of current calendar day (local)
        let startTime = new Date().setHours(0, 0, 0, 0);
        let userLocation = null;
        let userLocationMarker = null;
        let currentISSData = null;
        let baseLayer;
        let currentView = 'map'; // 'map' or 'globe'
        
        // Orbit line colors for themes
        const orbitColors = {
            dark: { past: '#00ff88', future: '#ffcc00' },
            light: { past: '#006644', future: '#aa8800' }
        };

        // Returns the appropriate tile URL based on current theme
        function getTileLayerUrl() {
            const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            return theme === 'light'
                ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
                : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';
        }

        // Updates the base tile layer URL when theme changes
        function updateBaseLayer() {
            if (baseLayer) {
                baseLayer.setUrl(getTileLayerUrl());
            }
        }
        // Update orbit polyline colors to match theme
        function updateOrbitColors(theme) {
            if (currentOrbitLine) {
                currentOrbitLine.setStyle({ color: orbitColors[theme].past });
            }
            if (futureOrbitLine) {
                futureOrbitLine.setStyle({ color: orbitColors[theme].future });
            }
        }

        // Initialize app
        window.addEventListener('load', () => {
            setTimeout(() => {
                initializeMap();
                startTracking();
                document.getElementById('loadingScreen').classList.add('hidden');
                document.getElementById('app').classList.add('loaded');
            }, 1500);
        });

        window.addEventListener('resize', () => {
            // No 3D globe to resize
        });

        // Initialize map
        function initializeMap() {
            map = L.map('map', {
                center: [0, 0],
                zoom: 2,
                worldCopyJump: true,
                zoomControl: false
            });

            // Add custom zoom control
            L.control.zoom({
                position: 'topright'
            }).addTo(map);

            // Base map tiles
            baseLayer = L.tileLayer(getTileLayerUrl(), {
                attribution: '© OpenStreetMap contributors © CARTO',
                maxZoom: 19
            }).addTo(map);

            // Custom ISS icon
            const issIcon = L.divIcon({
                html: '<div style="font-size: 30px;">🛰️</div>',
                className: 'iss-icon',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });

            issMarker = L.marker([0, 0], { icon: issIcon }).addTo(map);
        }

        

        // Calculate future orbit
        function calculateFutureOrbit(lat, lng, numPoints = 90) {
            const points = [];
            const orbitalPeriod = 90;
            const degreesPerMinute = 360 / orbitalPeriod;
            
            for (let i = 1; i <= numPoints; i++) {
                let futureLng = (lng + (degreesPerMinute * i * 1.5)) % 360;
                if (futureLng > 180) futureLng -= 360;
                
                let futureLat = 51.6 * Math.sin((i / numPoints) * 2 * Math.PI + (lat * Math.PI / 180));
                points.push([futureLat, futureLng]);
            }
            return points;
        }

        // Update ISS position
        async function updateISSPosition() {
            try {
                const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
                const data = await response.json();
                
                const lat = parseFloat(data.latitude);
                const lng = parseFloat(data.longitude);
                const altitude = parseFloat(data.altitude);
                const velocity = parseFloat(data.velocity);
                
                currentISSData = data;
                
                // Update marker
                issMarker.setLatLng([lat, lng]);

                updateMapDisplay(lat, lng, altitude, velocity);
                
                // Update UI
                updateUIDisplay(lat, lng, altitude, velocity, data.visibility);
                
            } catch (error) {
                console.error('Error fetching ISS position:', error);
            }
        }

        function updateUIDisplay(lat, lng, altitude, velocity, visibility) {
            document.getElementById('latitude').textContent = lat.toFixed(4) + '°';
            document.getElementById('longitude').textContent = lng.toFixed(4) + '°';
            document.getElementById('altitude').textContent = altitude.toFixed(2);
            document.getElementById('velocity').textContent = velocity.toFixed(2);
            
            // Update statistics
            updateStatistics(velocity);
            
            // Check if ISS is in daylight
            const isDaylight = visibility === 'daylight';
            document.getElementById('daylightTime').textContent = isDaylight ? 'Yes ☀️' : 'No 🌙';
            
            // Update pass predictions if user location is set
            if (userLocation) {
                updatePassPredictions();
            }
        }

        // Update statistics

        function updateMapDisplay(lat, lng, altitude, velocity) {
            // Follow ISS if enabled
            if (followISS) {
                map.panTo([lat, lng]);
            }
            
            // Update trajectory
            currentOrbitPoints.push([lat, lng]);
            if (currentOrbitPoints.length > 300) {
                currentOrbitPoints.shift();
            }
            
            // Draw past trajectory
            if (currentOrbitLine) {
                currentOrbitLine.setLatLngs(currentOrbitPoints);
            }
            else {
                // Create past trajectory line with theme-specific color
                const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
                currentOrbitLine = L.polyline(currentOrbitPoints, {
                    color: orbitColors[theme].past,
                    weight: 3,
                    opacity: 0.8,
                    smoothFactor: 1
                }).addTo(map);
            }
            
            // Draw future trajectory
            const futurePoints = calculateFutureOrbit(lat, lng);
            if (futureOrbitLine) {
                futureOrbitLine.setLatLngs([[lat, lng], ...futurePoints]);
            } else {
                // Create future trajectory line with theme-specific color
                const themeF = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
                futureOrbitLine = L.polyline([[lat, lng], ...futurePoints], {
                    color: orbitColors[themeF].future,
                    weight: 2,
                    opacity: 0.5,
                    dashArray: '5, 10',
                    smoothFactor: 1
                }).addTo(map);
            }
        }

        

        // Update statistics
        function updateStatistics(velocity) {
            const now = Date.now();
            const timeDiff = (now - lastUpdateTime) / 1000 / 3600; // hours
            totalDistance += velocity * timeDiff;
            lastUpdateTime = now;
            
            // Calculate orbits
            const hoursElapsed = (now - startTime) / 1000 / 3600;
            orbitsToday = Math.floor(hoursElapsed / 1.5);
            
            document.getElementById('orbitsToday').textContent = orbitsToday;
            document.getElementById('distanceTraveled').textContent = totalDistance.toFixed(0) + ' km';
        }

        // Start tracking
        function startTracking() {
            updateISSPosition();
            setInterval(updateISSPosition, 2000);
        }

        // Use geolocation
        function useMyLocation() {
            const statusEl = document.getElementById('locationStatus');
            statusEl.textContent = 'Getting your location...';
            
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        setUserLocation(lat, lng, 'Your Location');
                        statusEl.textContent = `Location set: ${lat.toFixed(2)}°, ${lng.toFixed(2)}°`;
                    },
                    (error) => {
                        statusEl.textContent = 'Error: ' + error.message;
                    }
                );
            } else {
                statusEl.textContent = 'Geolocation not supported';
            }
        }

        // Search location using Nominatim
    async function searchLocation() {
        const query = document.getElementById('locationInput').value;
        const statusEl = document.getElementById('locationStatus');
        
        if (!query) {
            statusEl.textContent = 'Please enter a location';
            return;
        }
        
        statusEl.textContent = 'Searching...';
        
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`);
            const data = await response.json();
            
            if (data.length > 0) {
                const location = data[0];
                const lat = parseFloat(location.lat);
                const lng = parseFloat(location.lon);
                setUserLocation(lat, lng, location.display_name);
                statusEl.textContent = `Found: ${location.display_name}`;
            } else {
                statusEl.textContent = 'Location not found';
            }
        } catch (error) {
            statusEl.textContent = 'Error searching location';
        }
    }

    // Set user location
    function setUserLocation(lat, lng, name) {
        userLocation = { lat, lng, name };
        
        // Remove existing marker
        if (userLocationMarker) {
            map.removeLayer(userLocationMarker);
        }
        
        // Add new marker
        const userIcon = L.divIcon({
            html: `<div style="background: var(--primary-color); width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });
        
        userLocationMarker = L.marker([lat, lng], { icon: userIcon })
            .addTo(map)
            .bindPopup(name);
        
        // Calculate passes
        calculateISSPasses();
    }

    // Calculate ISS passes
    function calculateISSPasses() {
        if (!userLocation || !currentISSData) return;
        
        const passes = [];
        const now = new Date();
        
        // Simplified pass prediction (in a real app, you'd use SGP4/SDP4 algorithms)
        // This is a rough approximation based on ISS orbital period
        for (let i = 0; i < 5; i++) {
            const passTime = new Date(now.getTime() + (i * 90 + Math.random() * 30) * 60000);
            const duration = Math.floor(Math.random() * 400) + 200; // 3-10 minutes
            const maxElevation = Math.floor(Math.random() * 70) + 20; // 20-90 degrees
            
            passes.push({
                time: passTime,
                duration: duration,
                maxElevation: maxElevation,
                direction: getRandomDirection()
            });
        }
        
        displayPasses(passes);
    }

    // Get random direction
    function getRandomDirection() {
        const directions = ['NW to SE', 'SW to NE', 'W to E', 'S to N', 'SE to NW'];
        return directions[Math.floor(Math.random() * directions.length)];
    }

    // Display passes
    function displayPasses(passes) {
        const passListEl = document.getElementById('passList');
        passListEl.innerHTML = '';
        
        if (passes.length === 0) {
            passListEl.innerHTML = '<p style="color: var(--text-secondary); font-size: 14px;">No visible passes in the next few days</p>';
            return;
        }
        
        passes.forEach(pass => {
            const passEl = document.createElement('div');
            passEl.className = 'pass-item';
            
            const quality = pass.maxElevation > 60 ? 'excellent' : 
                           pass.maxElevation > 40 ? 'good' : 'fair';
            
            passEl.innerHTML = `
                <div class="pass-time">${formatPassTime(pass.time)}</div>
                <div class="pass-details">
                    Duration: ${Math.floor(pass.duration / 60)}m ${pass.duration % 60}s<br>
                    Max elevation: ${pass.maxElevation}°<br>
                    Direction: ${pass.direction}
                </div>
                <span class="pass-quality ${quality}">${quality.toUpperCase()} PASS</span>
            `;
            
            passListEl.appendChild(passEl);
        });
    }

    // Format pass time
    function formatPassTime(date) {
        const options = { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        return date.toLocaleString('en-US', options);
    }

    // Update pass predictions periodically
    function updatePassPredictions() {
        // Only recalculate every 5 minutes
        if (!userLocation) return;
        
        const now = Date.now();
        if (!this.lastPassUpdate || now - this.lastPassUpdate > 300000) {
            this.lastPassUpdate = now;
            calculateISSPasses();
        }
    }

    // Control functions
    function togglePanel() {
        const panel = document.getElementById('sidePanel');
        panel.classList.toggle('open');
    }

    function toggleFollow() {
        followISS = !followISS;
        const btn = document.getElementById('followBtn');
        btn.classList.toggle('active', followISS);
        if (followISS) {
            const currentPos = issMarker.getLatLng();
            map.panTo(currentPos);
        }
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            document.body.classList.add('fullscreen');
        } else {
            document.exitFullscreen();
            document.body.classList.remove('fullscreen');
        }
    }

    function shareApp() {
        document.getElementById('shareModal').classList.add('open');
    }

    function closeModal() {
        document.getElementById('shareModal').classList.remove('open');
    }

    function shareOnTwitter() {
        const text = 'Check out this amazing live view of Earth from the International Space Station!';
        const url = window.location.href;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        closeModal();
    }

    function copyLink() {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
        closeModal();
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'f') toggleFollow();
        if (e.key === 'F11') e.preventDefault(); // Let our fullscreen handle it
        if (e.key === 's') togglePanel();
    });

    // Handle enter key in location input
    document.getElementById('locationInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchLocation();
        }
    });
    // Theme functions
    function setTheme(theme) {
        const htmlEl = document.documentElement;
        if (theme === 'light') {
            htmlEl.setAttribute('data-theme', 'light');
        }
        else {
            htmlEl.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', theme);
        updateThemeButton(theme);
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'light' ? '#ffffff' : '#000000');
        }
        // Switch base layer tiles to match theme
        updateBaseLayer();
        // Adjust ISS trajectory colors for new theme
        updateOrbitColors(theme);
    }

    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        setTheme(current === 'light' ? 'dark' : 'light');
    }

    function updateThemeButton(theme) {
        const btn = document.getElementById('themeToggleBtn');
        if (!btn) return;
        const iconSpan = btn.querySelector('span:first-child');
        const textSpan = btn.querySelector('span:last-child');
        if (theme === 'light') {
            iconSpan.textContent = '🌙';
            textSpan.textContent = 'Dark Mode';
        } else {
            iconSpan.textContent = '☀️';
            textSpan.textContent = 'Light Mode';
        }
    }

    // Initialize theme on load
    (function() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
    })();

    // Function to change the video stream
    function changeStream(streamUrl) {
        const iframe = document.querySelector('.stream-container iframe');
        if (iframe) {
            iframe.src = streamUrl;
        }
    }

    function toggleView() {
        // No 3D view, so this button will do nothing or be hidden
        console.log("Toggle view button clicked, but 3D view is disabled.");
    }

    window.toggleView = toggleView; // Make toggleView globally accessible