export const weatherOptions = [
  {
    day: true,
    condition: 'clear',
    url: new URL('../assets/day/clear.png', import.meta.url).href,
  },
  {
    day: true,
    condition: 'clouds',
    url: new URL('../assets/day/clouds.png', import.meta.url).href,
  },
  {
    day: true,
    condition: 'fog',
    url: new URL('../assets/day/fog.png', import.meta.url).href,
  },
  {
    day: true,
    condition: 'rain',
    url: new URL('../assets/day/rain.png', import.meta.url).href,
  },
  {
    day: true,
    condition: 'snow',
    url: new URL('../assets/day/snow.png', import.meta.url).href,
  },
  {
    day: true,
    condition: 'storm',
    url: new URL('../assets/day/storm.png', import.meta.url).href,
  },
  {
    day: false,
    condition: 'clear',
    url: new URL('../assets/night/clear.png', import.meta.url).href,
  },
  {
    day: false,
    condition: 'clouds',
    url: new URL('../assets/night/clouds.png', import.meta.url).href,
  },
  {
    day: false,
    condition: 'fog',
    url: new URL('../assets/night/fog.png', import.meta.url).href,
  },
  {
    day: false,
    condition: 'rain',
    url: new URL('../assets/night/rain.png', import.meta.url).href,
  },
  {
    day: false,
    condition: 'snow',
    url: new URL('../assets/night/snow.png', import.meta.url).href,
  },
  {
    day: false,
    condition: 'storm',
    url: new URL('../assets/night/storm.png', import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL('../assets/day/default.png', import.meta.url).href,
  },
  night: {
    url: new URL('../assets/night/default.png', import.meta.url).href,
  },
};

export const coordinates = {
  latitude: 41.034326,
  longitude: -73.761119,
};

// export const APIkey = import.meta.env.VITE_API_KEY;

export const APIkey = '3654ac2e72a994e84376fb77d933921b';

export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://api.wtwrfg.twilightparadox.com'
    : 'http://localhost:3001';
