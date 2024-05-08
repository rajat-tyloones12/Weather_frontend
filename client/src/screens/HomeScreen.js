import React, { useState, useEffect } from 'react';
import axios from 'axios';


function HomeScreen() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [favorites, setFavorites] = useState([]);
 

  const apiKey = 'fa7f4b40b7350242cd390f77fb282c0a';

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Noida&appid=${apiKey}`);
        setWeather(weatherResponse.data);

        // Fetch 5-day forecast data for the default city (Noida)
        const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Noida&appid=${apiKey}`);
        setForecast(forecastResponse.data.list.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Error fetching weather data. Please try again.');
      }
    };

    fetchWeatherData();
  }, []);

  const searchCity = async () => {
    try {
      // Fetch current weather data for the searched city
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${apiKey}`);
      setWeather(weatherResponse.data);

      // Fetch 5-day forecast data for the searched city
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&appid=${apiKey}`);
      setForecast(forecastResponse.data.list.slice(0, 5));

      // Clear search query and message
      setSearchQuery('');
      setMessage('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('City not found. Please try again.');
    }
  };

  

   const addToFavorites = async (cityName) => {
  const accessToken = sessionStorage.getItem('accessToken');
  console.log(accessToken);
  if (accessToken) {
    try {
      
      // Correctly include the headers in the Axios configuration object
      const response = await axios.post(
        'http://localhost:5001/api/weather/add-to-favorites',
        {cityName},
        
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        }
      );
      setFavorites([...favorites, cityName]);
      
      console.log(response.data);
      console.log(`Added ${cityName} to favorites`);
      alert('City added favorites.');
    } catch (error) {
      console.error('Error adding to favorites:', error);
      // Handle error adding to favorites
    }
  } else {
    alert('You need to sign in to add favorites.');
    window.location.href = '/login';
  }
};
 return (
  <div className="weather-container">
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for a city..."
        className="search-bar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className="search-button" onClick={searchCity}>Search</button>
    </div>
    {message && <p className="message">{message}</p>}
    {weather && (
      <div className="weather-card">
        <h2>{weather.name}</h2>
        <div className="weather-details">
          <div className="weather-icon">
            {weather.weather && weather.weather[0] && (
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].main}
              />
            )}
          </div>
          <div className="weather-info">
            <p>Temperature: {(weather.main.temp - 273.15).toFixed(1)}°C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Weather: {weather.weather[0].main}</p>
          </div>
        </div>
        {forecast.length > 0 && (
          <div className="forecast">
            <h3>5 Day Forecast:</h3>
            <div className="forecast-icons">
              {forecast.map((forecastItem, i) => (
                <div key={i} className="forecast-item">
                  {forecastItem.weather && forecastItem.weather[0] && (
                    <img
                      src={`http://openweathermap.org/img/wn/${forecastItem.weather[0].icon}.png`}
                      alt={forecastItem.weather[0].main}
                    />
                  )}
                  <p>{(forecastItem.main.temp - 273.15).toFixed(1)}°C</p>
                  <p>Humidity: {forecastItem.main.humidity}%</p>
                </div>
              ))}
            </div>
          </div>
        )}
        <button className='add-to-favorites-btn' onClick={() => addToFavorites(weather.name)}>Add to Favorites</button>
      </div>
    )}
  </div>
);


}

export default HomeScreen;