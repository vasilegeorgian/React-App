import {
  clearDay,
  clearNight,
  clouds,
  partlyCloudyDay,
  partlyCloudyNight,
  rainDrizzle,
  snow,
} from './media';

import styles from './Weather.module.css';

export function CurrentWeather({ weather }) {
  const getIcon = (icon) => {
    switch (icon) {
      case 'clear-day':
        return clearDay;
      case 'clear-night':
        return clearNight;
      case 'partly-cloudy-day':
        return partlyCloudyDay;
      case 'partly-cloudy-night':
        return partlyCloudyNight;
      case 'rain':
      case 'showers-day':
      case 'showers-night':
      case 'thunder-rain':
      case 'thunder-showers-day':
      case 'thunder-showers-night':
        return rainDrizzle;
      case 'snow':
      case 'snow-showers-day':
      case 'snow-showers-night':
        return snow;
      case 'wind':
      case 'mist':
      case 'cloudy':
        return clouds;
      default:
        return null;
    }
  };
  const currentTemp = ((weather?.currentConditions.temp - 32) / 1.8).toFixed();
  const maxTemp = ((weather?.days[0].tempmax - 32) / 1.8).toFixed();
  const minTemp = ((weather?.days[0].tempmin - 32) / 1.8).toFixed();
  
                        
                        
                        
  return (
    <article className={styles.currentWeather}>
                        
      <img
        src={getIcon(weather?.currentConditions.icon)}
        alt={weather?.currentConditions.conditions}
        className={styles.iconCurrentWeather}
      />
                        
      <p>{`${weather?.currentConditions.conditions}, ${
        weather && currentTemp
      }°`}</p>
      <ul className={styles.maxMin}>
        <li>Max: {weather && maxTemp} &deg;</li>
        <li>Min: {weather && minTemp} &deg;</li>
       
      </ul>
    </article>
  );
}


// Vasile Georgian Cristinel Accesa Internship weather-app