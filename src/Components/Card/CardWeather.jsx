import React from "react";
import Spinner from "../Spinner/Spinner";
import "./CardWeather.css";
import "../Navbar/Navbar.css"
import { Card, CardHeader, Heading, CardBody, Text } from "@chakra-ui/react";

const getWeatherIcon = (cond) => {
  switch (cond.toLowerCase()) {
    case "clear":
    case "sunny":
      return (
        <img
          src={`/images/sol.png`}
          alt="icono soleado"
          className="weather-icon"
        />
      );

    case "clouds":
      return (
        <img
          src={`/images/nube.png`}
          alt="icono nublado"
          className="weather-icon"
        />
      );
    case "partly cloudy":
    case "nubes dispersas":
      return (
        <img
          src={"/images/nubes-dispersas.png"}
          alt="icono parcialmente nublado"
          className="weather-icon"
        />
      );

    case "rain":
      return (
        <img
          src={`/images/nublado-lluvia.png`}
          alt="icono nublado con lluvia"
          className="weather-icon"
        />
      );

    case "snow":
      return (
        <img
          src={`/images/nieve.png`}
          alt="icono nevado"
          className="weather-icon"
        />
      );

    case "night":
      return (
        <img
          src={`/images/noche.png`}
          alt="icono de noche despejado"
          className="weather-icon"
        />
      );

    default:
      return (
        <img
          src={`/images/sol.png`}
          alt="icono soleado"
          className="weather-icon"
        />
      );
  }
};

const CardWeather = ({
  showData,
  loadingData,
  weather,
  forecast,
  busquedaDeCiudad,
}) => {
  if (loadingData) {
    return <Spinner />;
  }

  if (!showData && busquedaDeCiudad) {
    return <div className="error">Datos ingresados no disponibles.</div>;
  }

  if (!showData) {
    return null;
  }

  const weatherCondition = weather.weather[0].main.toLowerCase();
  let backgroundVideo = "/videos/soleado.mp4"; // Video por defecto

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  const weatherUpperCase = capitalizeFirstLetter(
    weather.weather[0].description
  );

  const pronosticoSiguientes = forecast.list.filter((reading) =>
    reading.dt_txt.includes("12:00:00")
  ); //Muestra las predicciones de los pronosticos de los dias siguientes siempre en el horario de las 12:00 P.M.

  switch (weatherCondition) {
    case "clear":
      backgroundVideo = "/videos/soleado.mp4";
      break;
    case "clouds":
      backgroundVideo = "/videos/nublado.mp4";
      break;
    case "rain":
    case "drizzle":
    case "thunderstorm":
      backgroundVideo = "/videos/lluvioso.mp4";
      break;
    default:
      backgroundVideo = "/videos/default.mp4"; // Video por defecto
  }

  return (
    <div className="container">
      <div id="background-video">
        <video autoPlay loop muted>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      </div>
      <div className="weather-card">
      <Card className="card " >
        <CardHeader>
          <Heading size="md" className="text">
            {weather.name}, {weather.sys.country}
          </Heading>
          <br />
          <Text>Hoy</Text>
        </CardHeader>
        <CardBody className="description">
          {getWeatherIcon(weather.weather[0].main)}
          <br />
          <p className="pronostico">{weatherUpperCase}</p>
          <br />
          <div className="text-description">
            <p>Temperatura: {Math.round(weather.main.temp - 273.15)}°C</p>
            <p>Humedad: {weather.main.humidity}%</p>
            <p>Viento: {weather.wind.speed} m/s</p>
          </div>
        </CardBody>
      </Card>
      </div>

      {pronosticoSiguientes.map((forecast, index) => {
        return (
          <div key={index} className="weather-card-next" >
          <Card  className="card ">
            <CardHeader>
              <Heading size="md" className="text text-next-forecast">
                {" "}
                {weather.name}, {weather.sys.country}
              </Heading>
              <br />
              <Text className="fecha">
                {new Date(forecast.dt_txt).toLocaleDateString()}
              </Text>
            </CardHeader>
            <CardBody className="description">
              <div className="icon">
              {getWeatherIcon(forecast.weather[0].main)}
              </div>
              <br />
              <div className="pronostico">
              <p>{capitalizeFirstLetter(forecast.weather[0].description)}</p>
              </div>
              <br />
              <div className="text-description">
                <p>Temperatura: {Math.round(forecast.main.temp - 273.15)}°C</p>
                <p>Humedad: {forecast.main.humidity}%</p>
                <p>Viento: {forecast.wind.speed} m/s</p>
              </div>
            </CardBody>
          </Card>
          </div>
        );
      })}
    </div>
  );
};

export default CardWeather;
