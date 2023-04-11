import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import styles from './Weather.module.css';

export function Favorites({ location, onRemove }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=BAN85EU5L4834PSBRZN2MUMZG`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
      });
  }, [location]);

  const currentTemp = ((weather?.currentConditions.temp - 32) / 1.8).toFixed();
  const maxTemp = ((weather?.days[0].tempmax - 32) / 1.8).toFixed();
  const minTemp = ((weather?.days[0].tempmin - 32) / 1.8).toFixed();

  const handleDeleteLocation = () => {
    onRemove(location);
  };

  return (
    <article className={styles.favoriteCard}>
      <h2>{location}</h2>
      <p>{`${weather?.currentConditions.conditions}, ${
        weather && currentTemp
      }°`}</p>
      <ul>
        <li>Max: {weather && maxTemp} &deg;</li>
        <li>Min: {weather && minTemp} &deg;</li>
      </ul>
      <FontAwesomeIcon
        icon={solid('circle-minus')}
        onClick={handleDeleteLocation}
        className={styles['push-center']}
      />
    </article>
  );
}


 //Vasile Georgian Cristinel Accesa Internship weather-app 