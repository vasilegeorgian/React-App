import {
  clearDayIcon,
  cloudy,
  partlyCloudy,
  rain,
  showersDay,
  snowShowers,
  thunderRain,
  wind,
} from './media';

import styles from './Weather.module.css';

export function Forecast({ weather }) {
  const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const dayInWeek = new Date().getDay();
  const forecastDays = weekDays
    .slice(dayInWeek, weekDays.length)
    .concat(weekDays.slice(0, dayInWeek));

  const getIcon = (icon) => {
    switch (icon) {
      case 'clear-day':
        return clearDayIcon;
      case 'cloudy':
        return cloudy;
      case 'partly-cloudy-day':
      case 'partly-cloudy-night':
        return partlyCloudy;
      case 'rain':
        return rain;
      case 'showers-day':
      case 'showers-night':
        return showersDay;
      case 'snow':
      case 'snow-showers-day':
      case 'snow-showers-night':
        return snowShowers;
      case 'thunder-rain':
      case 'thunder-showers-day':
      case 'thunder-showers-night':
        return thunderRain;
      case 'wind':
      case 'mist':
        return wind;
      default:
        return null;
    }
  };

  return (
    <>
      {weather?.days.slice(1, 8).map((day, index) => (
        <article key={index} className={styles.forecast}>
          <p className={styles.forecastDays}>{forecastDays[index]}</p>
          <p> {day && ((day?.tempmax - 32) / 1.8).toFixed()} &deg;</p>
          <img
            src={getIcon(day.icon)}
            alt={day.conditions}
            className={styles.iconForecast}
          />
        </article>
      ))}
    </>
  );
}


// Vasile Georgian Cristinel Accesa Internship weather-app