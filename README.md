# ISS Live Tracker 🛰️

A real-time International Space Station (ISS) tracker with live Earth views from space. Track the ISS position, watch live footage from onboard cameras, and find out when you can see it from your location.

## About
This is a fun vibe-coded project with Claude Opus 4. After stargazing with my kids one night, I wanted them to be able to see where the ISS was as well as a live video feed on one device without having a satellite tracking app in one hand and a device with YouTube in the other.

![ISS Live Tracker Preview](https://img.shields.io/badge/Live-Demo-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34C26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

## 🌟 Features

### Real-Time Tracking
- **Live ISS Position** - Updates every 2 seconds with current coordinates, displayed in the stats panel
- **Orbital Trajectory** - Visual path showing where the ISS has been and where it's going
- **Flight Statistics** - Current altitude and velocity, displayed in the stats panel
- **Sunlight Indicator** - Shows if the ISS is currently in daylight or eclipse
- **Auto-Follow Mode** - Keep the ISS centred on screen as it moves

### Live Video Stream
- **NASA Live Feed** - Direct stream from ISS cameras showing Earth views (single source)
- **Full HD Support** - Watch Earth from space in high definition

### Pass Predictions
- **Location Detection** - Use GPS or search for any location worldwide
- **Visible Pass Times** - Find out when the ISS will fly over your area
- **Pass Quality Ratings** - See which passes will be best for viewing
- **Detailed Information** - Duration, maximum elevation, and direction

### Modern UI/UX
- **Dark & Light Modes** - Toggle between dark and light themes
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Professional transitions and effects
- **Keyboard Shortcuts** - Quick access to key features

## 🚀 Quick Start

### Option 1: Direct Use
Simply open `index.html` in a modern web browser. No installation or server required!

```bash
git clone https://github.com/yourusername/iss-live-tracker.git
cd iss-live-tracker
open index.html  # On macOS
# or
start index.html  # On Windows
# or
xdg-open index.html  # On Linux
```

### Option 2: Local Server (Recommended)
For best performance and to avoid any CORS issues:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server

# Then open http://localhost:8000 in your browser
```

## 📱 Deployment

### GitHub Pages (Free)
1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/ (root)`
5. Your site will be live at `https://[username].github.io/iss-live-tracker`

### Netlify (Free)
1. Visit [netlify.com](https://netlify.com)
2. Drag and drop the project folder
3. Your site will be instantly deployed with HTTPS

### Vercel (Free)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy

## 🎮 Controls

### Buttons
- **Stats** - Toggle statistics panel with mission data
- **Follow ISS** - Auto-centre map on ISS position
- **Fullscreen** - Enter immersive fullscreen mode
- **Share** - Share the app on social media
- **Light/Dark Mode** - Toggle between light and dark themes

### Keyboard Shortcuts
- `F` - Toggle follow mode
- `S` - Toggle stats panel
- `ESC` - Exit fullscreen

## 🛠️ Technical Details

### APIs Used
- **WhereTheISS.at API** - Real-time ISS position data
- **YouTube Embed API** - NASA live stream integration

### Technologies
- **Leaflet.js** - Interactive mapping library
- **HTML5 Geolocation** - GPS/location detection
- **Vanilla JavaScript** - No framework dependencies
- **External CSS/JS** - Styles and scripts are now in separate files (`style.css`, `script.js`)

### Browser Support
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## 📊 Data Sources

- **ISS Position**: Real-time telemetry from WhereTheISS.at
- **Live Video**: NASA's official YouTube channel
- **Map Tiles**: CartoDB Dark Matter (dark mode) and Positron (light mode) via OpenStreetMap

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- NASA for providing the live ISS video feed
- WhereTheISS.at for the position tracking API
- OpenStreetMap contributors for mapping data
- Leaflet.js team for the excellent mapping library

## 🐛 Known Issues

- YouTube embed may require unmuting on some browsers due to autoplay policies
- Location search requires internet connection for geocoding

## 🔮 Future Enhancements

- [ ] Implement accurate SGP4/SDP4 orbital propagation
- [ ] Add ISS crew information display
- [ ] Include amateur radio frequencies for ISS communication
- [ ] Add notifications for upcoming visible passes
- [ ] Support for tracking other satellites

- [ ] Historical pass data and statistics
- [ ] Weather overlay for viewing conditions

## 📧 Contact

Created by Jim Christian - feel free to contact me!

Project Link: [https://github.com/aplaceforallmystuff/ISS-Tracker](https://github.com/aplaceforallmystuff/ISS-Tracker)

---

⭐ Star this repo if you find it useful!