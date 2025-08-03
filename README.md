<<<<<<< HEAD
# 🌦️ Drizzzle Weather App

A beautiful, responsive weather application with real-time data and intelligent outfit recommendations. Built with vanilla JavaScript, featuring smooth animations and dynamic weather-based backgrounds.

![Drizzzle Weather App](media/demo.gif)

## ✨ Features

### 🌡️ Weather Information
- **Real-time Weather Data** - Powered by OpenWeatherMap API
- **Current Temperature** - Accurate temperature readings in Celsius
- **Weather Conditions** - Detailed weather descriptions with appropriate icons
- **Location Display** - City name and country information
- **Additional Metrics** - Humidity, wind speed, and "feels like" temperature

### 🎨 Visual Experience
- **Dynamic Backgrounds** - Background colors change based on weather conditions
- **Weather Animations** - Realistic rain, snow, and cloud animations
- **Smooth Transitions** - GPU-accelerated animations with no performance lag
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Modern UI** - Clean, minimalist design with glassmorphism effects

### 👕 Smart Outfit Recommendations
- **Temperature-Based Suggestions** - Intelligent clothing recommendations based on current temperature
- **Weather-Aware Advice** - Specific suggestions for rain, snow, sun, and other conditions
- **Accessory Recommendations** - Umbrella, sunglasses, jackets, and seasonal gear suggestions
- **Color Guidance** - Color recommendations based on weather and temperature
- **Visual Icons** - Easy-to-understand clothing icons and emojis

### ⚡ Performance Optimized
- **Lightweight Animations** - Smooth animations that don't impact scrolling performance
- **GPU Acceleration** - Hardware-accelerated transforms for buttery smooth experience
- **Reduced Motion Support** - Respects user accessibility preferences
- **Fast Loading** - Optimized for quick load times and smooth interactions

## 🎬 Demo

### Main Interface
![Main Interface](media/main-interface.gif)
*Clean, modern interface with real-time clock and search functionality*

### Weather Search
![Weather Search](media/weather-search.gif)
*Search for any city worldwide with instant results*

### Dynamic Backgrounds
![Dynamic Backgrounds](media/weather-backgrounds.gif)
*Background changes based on weather conditions with matching animations*

### Outfit Recommendations
![Outfit Recommendations](media/outfit-recommendations.gif)
*Smart clothing suggestions based on weather and temperature*

### Responsive Design
![Responsive Design](media/responsive-design.gif)
*Perfect experience across all device sizes*

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for weather data
- OpenWeatherMap API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/thisispit/Drizzzle.git
   cd Drizzzle
   ```

2. **Get your API key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate your API key

3. **Configure the API key**
   - Open `script.js`
   - Replace the API key on line 19:
   ```javascript
   const apiKey = 'YOUR_API_KEY_HERE';
   ```

4. **Launch the application**
   - Open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   ```

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with flexbox, animations, and responsive design
- **Vanilla JavaScript** - No frameworks, pure JavaScript for performance

### APIs
- **OpenWeatherMap API** - Real-time weather data
- **Geolocation API** - Optional location detection

### Design Features
- **Glassmorphism** - Modern frosted glass effects
- **JetBrains Mono Font** - Clean, professional typography
- **CSS Animations** - Smooth, hardware-accelerated transitions
- **Responsive Grid** - Mobile-first responsive design

## 📱 Browser Support

| Browser | Version | Status |
|---------|---------|---------|
| Chrome | 60+ | ✅ Fully Supported |
| Firefox | 55+ | ✅ Fully Supported |
| Safari | 12+ | ✅ Fully Supported |
| Edge | 79+ | ✅ Fully Supported |
| Opera | 47+ | ✅ Fully Supported |

## 🎯 Key Features Breakdown

### Weather Conditions Supported
- ☀️ **Clear Sky** - Sunny backgrounds with gentle cloud animations
- ☁️ **Cloudy** - Overcast backgrounds with moving clouds
- 🌧️ **Rain/Drizzle** - Rain animations with appropriate color schemes
- ⛈️ **Thunderstorm** - Dramatic stormy backgrounds with rain effects
- ❄️ **Snow** - Winter theme with falling snow animation
- 🌫️ **Fog/Mist** - Subtle, mysterious atmospheric effects

### Outfit Intelligence
- **Temperature Ranges**:
  - 30°C+: Light, breathable clothing
  - 25-30°C: Summer attire
  - 20-25°C: Comfortable spring/fall wear
  - 15-20°C: Light layers recommended
  - 10-15°C: Warm clothing needed
  - 0-10°C: Winter gear required
  - Below 0°C: Heavy winter protection

- **Weather-Specific Accessories**:
  - Rain: Umbrella, raincoat
  - Snow: Winter boots, warm socks
  - Sun: Sunglasses, sun hat
  - Wind: Windbreaker, secure accessories

## 🔧 Customization

### Changing Colors
Edit the CSS variables in `style.css`:
```css
:root {
  --primary-color: #ffffff;
  --background-dark: #1e1e1e;
  --accent-color: #ff6b35;
}
```

### Adding New Weather Conditions
1. Add new weather icons in `getWeatherIcon()` function
2. Add corresponding background colors in weather-based CSS classes
3. Update outfit recommendations in `getOutfitRecommendation()` function

### Modifying Animations
All animations use CSS keyframes and can be customized in the CSS file:
- Adjust duration, easing, or effects
- Add new animation types
- Modify existing transitions

## 🐛 Troubleshooting

### Common Issues

**Weather data not loading**
- Check your internet connection
- Verify your API key is correct and active
- Ensure city name is spelled correctly

**Animations not smooth**
- Update to a modern browser
- Check if hardware acceleration is enabled
- Verify your device meets minimum requirements

**Layout issues on mobile**
- Clear browser cache
- Check viewport meta tag is present
- Ensure responsive breakpoints are working

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Test on multiple devices and browsers
- Ensure accessibility standards are met
- Keep animations lightweight and performant
- Document any new features or changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenWeatherMap** - For providing reliable weather data API
- **Google Fonts** - For the beautiful JetBrains Mono font
- **Contributors** - Thank you to everyone who has contributed to this project

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/thisispit/Drizzzle/issues) page
2. Create a new issue with detailed information
3. Provide browser version, device info, and steps to reproduce

---

<div align="center">

**Made with ❤️ by [thisispit](https://github.com/thisispit)**

[⭐ Star this repo](https://github.com/thisispit/Drizzzle) | [🐛 Report Bug](https://github.com/thisispit/Drizzzle/issues) | [💡 Request Feature](https://github.com/thisispit/Drizzzle/issues)
