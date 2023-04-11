import { useEffect, useState } from 'react';
import { CurrentWeather } from './CurrentWeather';
import { Forecast } from './Forecast';
import { Favorites } from './Favorites';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import clsx from 'clsx';

import styles from './Weather.module.css';

export function Weather() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [openFavorites, setOpenFavorites] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (geo) => {
        const { latitude, longitude } = geo.coords;

        fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=BAN85EU5L4834PSBRZN2MUMZG`
        )
          .then((res) => res.json())
          .then((data) => {
            setIsLoading(false);
            setCurrentTime(data.currentConditions.datetime);
            setCurrentWeather(data);
            setForecast(data);
          });
      },
      () => setIsLoading(false)
    );
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=BAN85EU5L4834PSBRZN2MUMZG`
    )
      .then((res) => res.json())
      .then((data) => {
        setCurrentTime(data.currentConditions.datetime);
        setCurrentWeather(data);
        setForecast(data);
      });
  };

  const [favorites, setFavorites] = useState(() => {
  const fromStorage = localStorage.getItem('favorites');
  if (fromStorage) {
    return JSON.parse(fromStorage);
  }
  return [];
});


  const handleAddFavorite = () => {
    if (!city) {
      return;
    }

    if (!favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const handleRemoveFavorite = (locationToRemove) => {
    const updatedFavorites = favorites.filter(
      (loc) => loc !== locationToRemove
    );
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // get current hour
  const currentHour = currentTime.substring(0, 2);

  return (
    <>
      <main
        className={clsx(
          styles.day,
          {
            [styles.night]: !(currentHour >= 7 && currentHour < 20),
          },
          styles.weather
        )}
      >
        <section className={styles['search-bar']}>
          <FontAwesomeIcon icon={solid('plus')} onClick={handleAddFavorite} />
          <form onSubmit={handleSubmit}>
            <p>
              <label htmlFor="city"></label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                placeholder="Search for a city"
                className={clsx(styles.day, {
                  [styles.night]: !(currentHour >= 7 && currentHour < 20),
                })}
                onChange={handleInputChange}
              />
              <FontAwesomeIcon
                icon={solid('magnifying-glass')}
                onClick={handleSubmit}
              />
            </p>
          </form>
          <FontAwesomeIcon
            icon={solid('bars')}
            className={styles['push-right']}
            onClick={() => setOpenFavorites(true)}
          />
        </section>
        {isLoading && <strong>Loading ...</strong>}
                           
        {currentWeather && <CurrentWeather weather ={currentWeather} />}
        {forecast && <Forecast weather={forecast} />}
      </main>
      <aside
        className={clsx(styles.favorites, {
          [styles.visible]: openFavorites,
        })}
      >
        <FontAwesomeIcon
          icon={solid('arrow-left')}
          className={styles['arrow-left']}
          onClick={() => setOpenFavorites(false)}
        />
        {favorites.map((favorite) => (
          <Favorites
            key={favorite}
            location={favorite}
            onRemove={handleRemoveFavorite}
          />
        ))}
      </aside>
    </>
  );
}

         
         // Vasile Georgian Cristinel Accesa Internship weather-app
