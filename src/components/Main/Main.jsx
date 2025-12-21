import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { BrowserRouter, Route } from "react-router-dom";

import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import { useContext } from "react";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTemperatureUnit === "F"
            ? weatherData.temp.F
            : weatherData.temp.C}
          °{currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              // If weather type is not set yet, show all items as a fallback.
              if (!weatherData.type) return true;
              return (
                (item.weather || "").toLowerCase() ===
                weatherData.type.toLowerCase()
              );
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id ?? item.id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
