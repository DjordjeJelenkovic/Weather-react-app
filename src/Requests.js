const API_KEY = "f62164933459c1a70c65eff2331ba657";

const request = {
  London_5Days: `http://api.openweathermap.org/data/2.5/forecast?q=London,uk&units=metric&appid=${API_KEY}`,
  Paris_5Days: `http://api.openweathermap.org/data/2.5/forecast?q=Paris,fra&units=metric&appid=${API_KEY}`,
  Madrid_5Days: `http://api.openweathermap.org/data/2.5/forecast?q=Madrid,spa&units=metric&appid=${API_KEY}`,

  get5DaysData: (cityName, stateCode) => {
    return `http://api.openweathermap.org/data/2.5/forecast?q=${cityName},${stateCode}&units=metric&appid=${API_KEY}`
  },
  get8DaysData: (lat, lon) => {
    return `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  }
};

export default request;