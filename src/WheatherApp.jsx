import { useState } from "react";
import "./WeatherApp.css";

export const WheatherApp = () => {

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null)

  const urlBase = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "";
  const difKelvin = 273.15; // Para lograr obtener grados celsius, debemos restar este número a los grados Kelvin

  const fetchWeatherData = async () => {
    try {
        const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`);
        const data = await response.json();
        console.log(data);        
        setWeatherData(data);
    } catch (error) {
        console.error('Ha habido un error: ', error);
    }
  }

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <>
      <div className="container">
        <h1>ClimaApp</h1>
        <form onSubmit={handleSubmit}>
          <input            
            type="text"
            placeholder="Ingresá una ciudad"
            value={city}
            onChange={handleCityChange}
          />
          <button type="submit">Buscar</button>
        </form>

        {weatherData && (
            <div className="info-container">
                <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                <p>Temperatura actual: {Math.floor(weatherData.main.temp - difKelvin)} ºC</p>
                <p>Condición meteorológica: {weatherData.weather[0].description}</p>
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
            </div>
        )}
      </div>
    </>
  );
};
