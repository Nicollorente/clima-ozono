import React, { useState,useEffect } from "react";
import Form from "../Form/Form";
import CardWeather from "../Card/CardWeather"


const WeatherPanel = () => {
  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState("");
  const [video, setVideo] = useState("default.mp4");
  const [backgroundVideo, setBackgroundVideo] = useState('');
  const [loadingData, setLoadingData] = useState(true);
  const [busquedaDeCiudad,setBusquedaDeCiudad] = useState(false);




  const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?appid=d4ed951ce79e8dc4f7d2d7b56bf87d1e&lang=es";
  const cityUrl = "&q=";
  const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?appid=d4ed951ce79e8dc4f7d2d7b56bf87d1e&lang=es";


  const getLocation = async (loc) => {
    setLoading(true);
    setLocation(loc);
    setBusquedaDeCiudad(true);

    const weatherApiUrl = weatherUrl + cityUrl + loc;

    try {
      const weatherResponse = await fetch(weatherApiUrl);
      if (!weatherResponse.ok) throw new Error("Weather API error");
      const weatherData = await weatherResponse.json();
      setWeather(weatherData);

      const condition = weatherData.weather[0].main.toLowerCase();
      if (condition.includes("cloud")) {
        setVideo("nublado.mp4");
      } else if (condition.includes("clear")) {
        setVideo("soleado.mp4");
      } else if (condition.includes("rain")) {
        setVideo("lluvioso.mp4");
      } else {
        setVideo("default.mp4");
      }

      const forecastApiUrl = forecastUrl + cityUrl + loc;
      const forecastResponse = await fetch(forecastApiUrl);
      if (!forecastResponse.ok) throw new Error("Forecast API error");
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
      setLoading(false);
      setShow(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setShow(false);
    }
  };

  return (
    <div className="weather-panel">
      <Form newLocation={getLocation} />
      
      <video autoPlay muted loop id="background-video">
      <source src={`/videos/${video}`} type="video/mp4" />
      </video>
      <CardWeather
        showData={show}
        loadingData={loading}
        weather={weather}
        forecast={forecast}
        busquedaDeCiudad={busquedaDeCiudad}
      />
    </div>
  );
};

export default WeatherPanel;
