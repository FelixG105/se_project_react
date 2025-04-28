import './WeatherCard.css';
import { defaultWeatherOptions, weatherOptions } from '../../utils/constants';

function WeatherCard({ weatherData }) {
  // debugger;
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;

  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? 'day' : 'night'];
  } else {
    weatherOption = filteredOptions[0];
  }
  // debugger;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg;</p>
      <img
        src={weatherOption?.url}
        alt={weatherOption?.condition}
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;
