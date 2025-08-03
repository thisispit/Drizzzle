// Update time
function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    document.getElementById('current-time').textContent = time;
}

updateTime();
setInterval(updateTime, 1000);

document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    if (city) {
        getWeatherByCity(city);
    } else {
        showError('Please enter a city name to get weather information.');
    }
});

document.getElementById('city').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = document.getElementById('city').value;
        if (city) {
            getWeatherByCity(city);
        } else {
            showError('Please enter a city name to get weather information.');
        }
    }
});

function getWeatherByCity(city) {
    showLoading();
    const apiKey = '2a3174d3d9351fef4e64629ee8de0c3a';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            hideLoading();
            if (data.cod === 200) {
                displayWeather(data);
                recommendOutfit(data.weather[0].main, data.main.temp);
            } else {
                handleWeatherError(data);
            }
        })
        .catch(error => {
            hideLoading();
            console.error('Error fetching weather data:', error);
            showError('Connection failed. Please check your internet connection.');
        });
}

function showLoading() {
    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = `
        <div class="loading fade-in">
            <div class="loading-spinner"></div>
            <p>Loading weather data...</p>
        </div>
    `;
    
    // Clear any previous outfit recommendations while loading
    document.getElementById('outfit').innerHTML = '';
}

function hideLoading() {
    // Loading will be replaced by weather data or error message
}

function handleWeatherError(data) {
    let message = '';
    switch(data.cod) {
        case '404':
            message = `City "${document.getElementById('city').value}" not found. Please check spelling and try again.`;
            break;
        case '401':
            message = 'API key error. Please contact support.';
            break;
        case '429':
            message = 'Too many requests. Please try again later.';
            break;
        default:
            message = data.message || 'Unable to fetch weather data.';
    }
    showError(message);
}

function showError(message) {
    document.getElementById('weather-result').innerHTML = `
        <div class="error-message fade-in">
            <div class="error-icon">⚠️</div>
            <p>${message}</p>
        </div>
    `;
}

function displayWeather(data) {
    const weatherIcon = getWeatherIcon(data.weather[0].main);
    const colorClass = getWeatherColor(data.weather[0].main);
    const windSpeed = data.wind ? Math.round(data.wind.speed * 3.6) : 'N/A'; // Convert m/s to km/h
    
    // Change background based on weather
    changeBackground(data.weather[0].main);
    
    const weatherResult = `
        <div class="weather-display fade-in">
            <div class="weather-icon ${colorClass} bounce-in">${weatherIcon}</div>
            <div class="location slide-in">${data.name}, ${data.sys.country}</div>
            <div class="temperature pulse">${Math.round(data.main.temp)}°</div>
            <div class="description fade-in">${data.weather[0].description}</div>
            
            <div class="weather-details slide-up">
                <div class="detail-item">
                    <div class="detail-icon">💧</div>
                    <div class="detail-info">
                        <span class="detail-label">Humidity</span>
                        <span class="detail-value">${data.main.humidity}%</span>
                    </div>
                </div>
                <div class="detail-item">
                    <div class="detail-icon">💨</div>
                    <div class="detail-info">
                        <span class="detail-label">Wind Speed</span>
                        <span class="detail-value">${windSpeed} km/h</span>
                    </div>
                </div>
                <div class="detail-item">
                    <div class="detail-icon">🌡️</div>
                    <div class="detail-info">
                        <span class="detail-label">Feels like</span>
                        <span class="detail-value">${Math.round(data.main.feels_like)}°</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById('weather-result').innerHTML = weatherResult;
}

function changeBackground(weather) {
    const body = document.body;
    
    // Remove all weather classes
    body.className = body.className.replace(/\b(sunny|cloudy|rainy|stormy|snowy|foggy)\b/g, '');
    
    // Remove existing animations
    const existingAnimations = document.querySelectorAll('.rain-animation, .cloud, .snow-animation, .sun-particles, .lightning-flash, .fog-layer');
    existingAnimations.forEach(el => el.remove());
    
    // Add weather-specific class and animations
    switch (weather) {
        case 'Clear':
            body.classList.add('sunny');
            createSunParticles();
            createClouds(2);
            break;
        case 'Clouds':
            body.classList.add('cloudy');
            createClouds(4);
            break;
        case 'Rain':
        case 'Drizzle':
            body.classList.add('rainy');
            createRain();
            createClouds(3);
            break;
        case 'Thunderstorm':
            body.classList.add('stormy');
            createRain();
            createClouds(3);
            createLightning();
            break;
        case 'Snow':
            body.classList.add('snowy');
            createSnow();
            createClouds(2);
            break;
        case 'Mist':
        case 'Fog':
            body.classList.add('foggy');
            createFog();
            createClouds(5);
            break;
    }
}

function createRain() {
    const rainContainer = document.createElement('div');
    rainContainer.className = 'rain-animation';
    
    // Enhanced rain with better visibility
    for (let i = 0; i < 50; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = (Math.random() * 0.8 + 0.6) + 's';
        drop.style.animationDelay = Math.random() * 2 + 's';
        
        // Enhanced drop styling
        drop.style.cssText += `
            background: linear-gradient(to bottom, rgba(138, 196, 255, 0.9), rgba(52, 152, 219, 0.6));
            box-shadow: 0 0 8px rgba(52, 152, 219, 0.5);
            width: 3px;
        `;
        
        // Add some variation to drop sizes
        const height = Math.random() * 15 + 20;
        drop.style.height = height + 'px';
        
        rainContainer.appendChild(drop);
    }
    
    document.body.appendChild(rainContainer);
}

function createClouds(count) {
    // Limit maximum clouds for performance
    const maxClouds = Math.min(count, 4);
    for (let i = 0; i < maxClouds; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.top = Math.random() * 50 + '%';
        cloud.style.width = (Math.random() * 80 + 40) + 'px';
        cloud.style.height = (Math.random() * 30 + 20) + 'px';
        cloud.style.animationDuration = (Math.random() * 25 + 20) + 's';
        cloud.style.animationDelay = Math.random() * 5 + 's';
        document.body.appendChild(cloud);
    }
}

function createSnow() {
    const snowContainer = document.createElement('div');
    snowContainer.className = 'snow-animation';
    
    // Enhanced snow with better visibility
    for (let i = 0; i < 35; i++) {
        const flake = document.createElement('div');
        flake.className = 'snow-flake';
        flake.innerHTML = '❄';
        flake.style.left = Math.random() * 100 + '%';
        flake.style.animationDuration = (Math.random() * 4 + 3) + 's';
        flake.style.animationDelay = Math.random() * 2 + 's';
        flake.style.fontSize = (Math.random() * 10 + 12) + 'px';
        
        // Enhanced styling for better visibility
        flake.style.cssText += `
            color: rgba(255, 255, 255, 0.95);
            text-shadow: 0 0 12px rgba(255, 255, 255, 0.6);
        `;
        
        snowContainer.appendChild(flake);
    }
    
    document.body.appendChild(snowContainer);
}

function createSunParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'sun-particles';
    
    // Enhanced sun particles with better visibility
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'sun-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
        particle.style.animationDelay = Math.random() * 3 + 's';
        
        // Enhanced styling for better visibility
        const size = Math.random() * 8 + 6;
        particle.style.cssText += `
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.8), rgba(255, 140, 0, 0.6));
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
        `;
        
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

function createLightning() {
    // Enhanced lightning with better timing
    setInterval(() => {
        const flash = document.createElement('div');
        flash.className = 'lightning-flash';
        flash.style.cssText = `
            background: rgba(255, 255, 255, 0.4);
            box-shadow: 0 0 50px rgba(255, 255, 255, 0.6);
        `;
        document.body.appendChild(flash);
        
        setTimeout(() => flash.remove(), 200);
    }, 2500 + Math.random() * 4000);
}

function createFog() {
    const fogLayer = document.createElement('div');
    fogLayer.className = 'fog-layer';
    fogLayer.style.cssText = `
        background: linear-gradient(45deg, 
            rgba(200, 200, 200, 0.3), 
            rgba(150, 150, 150, 0.2), 
            rgba(180, 180, 180, 0.3));
        backdrop-filter: blur(2px);
    `;
    document.body.appendChild(fogLayer);
}

function recommendOutfit(weather, temperature) {
    let outfit = getOutfitRecommendation(weather, temperature);
    
    document.getElementById('outfit').innerHTML = `
        <div class="outfit-display fade-in">
            <div class="outfit-main">
                <div class="outfit-icons">
                    ${outfit.icons.join(' ')}
                </div>
                <div class="outfit-text">
                    <div class="outfit-title">${outfit.title}</div>
                    <div class="outfit-details">${outfit.description}</div>
                    ${outfit.accessories ? `<div class="outfit-accessories">🎒 ${outfit.accessories}</div>` : ''}
                    ${outfit.colors ? `<div class="outfit-colors">🎨 ${outfit.colors}</div>` : ''}
                </div>
            </div>
        </div>
    `;
}

function getOutfitRecommendation(weather, temperature) {
    let recommendation = {
        icons: [],
        title: '',
        description: '',
        accessories: '',
        colors: ''
    };

    // Base clothing on temperature
    if (temperature >= 30) {
        recommendation.icons = ['👕', '🩳'];
        recommendation.title = 'Hot Weather';
        recommendation.description = 'Light, breathable clothing';
        recommendation.colors = 'Light colors (white, beige, pastels) to reflect heat';
        recommendation.accessories = 'Sunglasses, sun hat, sunscreen';
    } else if (temperature >= 25) {
        recommendation.icons = ['👔', '👖'];
        recommendation.title = 'Warm Weather';
        recommendation.description = 'Comfortable summer attire';
        recommendation.colors = 'Bright or light colors';
        recommendation.accessories = 'Sunglasses, light cap';
    } else if (temperature >= 20) {
        recommendation.icons = ['👕', '👖'];
        recommendation.title = 'Pleasant Weather';
        recommendation.description = 'Light layers work well';
        recommendation.colors = 'Any colors you like';
        recommendation.accessories = 'Light scarf or cardigan';
    } else if (temperature >= 15) {
        recommendation.icons = ['🧥', '�'];
        recommendation.title = 'Cool Weather';
        recommendation.description = 'Light jacket recommended';
        recommendation.colors = 'Medium tones work well';
        recommendation.accessories = 'Light jacket, long sleeves';
    } else if (temperature >= 10) {
        recommendation.icons = ['🧥', '👖'];
        recommendation.title = 'Chilly Weather';
        recommendation.description = 'Warm layers needed';
        recommendation.colors = 'Darker colors for warmth';
        recommendation.accessories = 'Warm jacket, scarf';
    } else if (temperature >= 0) {
        recommendation.icons = ['�', '👖', '�🧤'];
        recommendation.title = 'Cold Weather';
        recommendation.description = 'Heavy winter clothing';
        recommendation.colors = 'Dark colors (navy, black, brown)';
        recommendation.accessories = 'Winter coat, gloves, warm hat';
    } else {
        recommendation.icons = ['🧥', '👖', '🧤', '🧣'];
        recommendation.title = 'Very Cold';
        recommendation.description = 'Full winter gear essential';
        recommendation.colors = 'Dark, warm colors';
        recommendation.accessories = 'Heavy coat, gloves, scarf, warm boots';
    }

    // Add weather-specific accessories
    switch (weather) {
        case 'Rain':
        case 'Drizzle':
            recommendation.accessories += ', umbrella ☂️, raincoat 🧥';
            recommendation.colors = 'Waterproof materials in any color';
            break;
        case 'Thunderstorm':
            recommendation.accessories += ', umbrella ☂️, waterproof jacket';
            recommendation.description += ' + stay indoors if possible';
            break;
        case 'Snow':
            recommendation.accessories += ', winter boots 🥾, warm socks';
            recommendation.colors = 'Dark colors (better heat absorption)';
            if (!recommendation.icons.includes('🧤')) recommendation.icons.push('🧤');
            if (!recommendation.icons.includes('🧣')) recommendation.icons.push('🧣');
            break;
        case 'Clear':
            if (temperature > 25) {
                recommendation.accessories += ', sunglasses 🕶️, sun hat 👒';
            }
            break;
        case 'Mist':
        case 'Fog':
            recommendation.accessories += ', visibility gear if driving';
            break;
    }

    return recommendation;
}

function getWeatherIcon(weather) {
    switch (weather) {
        case 'Clear':
            return '☀️';
        case 'Clouds':
            return '☁️';
        case 'Rain':
            return '🌧️';
        case 'Drizzle':
            return '🌦️';
        case 'Thunderstorm':
            return '⛈️';
        case 'Snow':
            return '❄️';
        case 'Mist':
        case 'Fog':
            return '🌫️';
        default:
            return '🌤️';
    }
}

function getWeatherColor(weather) {
    switch (weather) {
        case 'Clear':
            return 'sunny';
        case 'Clouds':
            return 'cloudy';
        case 'Rain':
        case 'Drizzle':
            return 'rainy';
        case 'Thunderstorm':
            return 'stormy';
        case 'Snow':
            return 'snowy';
        case 'Mist':
        case 'Fog':
            return 'foggy';
        default:
            return '';
    }
}

