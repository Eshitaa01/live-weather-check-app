import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = process.env.REACT_APP_API_KEY;

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name!");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found!");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const fetchDefaultWeather = async () => {
    setCity("Delhi");
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  fetchDefaultWeather();
}, [apiKey]);



  return (
  <div className="app">
    <h1>☁️ Live weather check</h1>

    <div className="main-layout">
      {/* Left side: Input and Button */}
      <div className="input">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
      </div>

      {/* Right side: Weather Info */}
      {weather && (
        <div className="weather-box">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>{weather.weather[0].main} - {weather.weather[0].description}</p>
          <p>🌡️ Temp: {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind: {weather.wind.speed} m/s</p>
          <p>{weather.rain ? `🌧️ Rain: ${weather.rain["1h"]} mm` : "No Rain"}</p>
          <p>{weather.snow ? `❄️ Snow: ${weather.snow["1h"]} mm` : "No Snow"}</p>
        </div>
      )}
    </div>

    <p style={{ marginTop: "2rem", fontSize: "0.9rem", opacity: 0.7 }}>
      Made by Eshita — Powered by OpenWeather
    </p>
  </div>
);

};

export default App;
