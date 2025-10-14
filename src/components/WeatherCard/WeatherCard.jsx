import "./WeatherCard.css";
import { defaultWeatherOptions } from "../../utils/constants.js";

function WeatherCard({ weatherData }) {
  const filteredOptions = defaultWeatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption =
      defaultWeatherOptions.find(
        (option) => option.day === weatherData.isDay
      ) || defaultWeatherOptions[0];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"}time ${
          weatherOption?.condition
        }weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
