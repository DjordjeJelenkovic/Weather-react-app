import './App.css';
import { useState, useEffect } from 'react';
import request from './Requests';
import SearchCity from './components/SearchCity';
import FiveDaysTemp from './components//FiveDaysTemp';
import Weekdays from './components/Weekdays';
import Drzave from "./CountryCodes.json"
import useFetch from './hooks/useFetch';

function App() {
  const [emptyFlag, setEmptyFlag] = useState(false);
  const [data5Days, setData5Days] = useState('')
  const [data8Days, setData8Days] = useState('')
  const [threeCities5Days, setThreeCities5Days] = useState([])
  const [threeCities8Days, setThreeCities8Days] = useState([])
  const [countries, setCountries] = useState([])
  const [codes, setCodes] = useState([])
  const [codesString, setCodesStrings] = useState([])
  const [bg, setBg] = useState("");

  let searchedCity;

  const { error, setError, isPending, data5, data8, submitRequest } = useFetch()

  useEffect(() => {
    setEmptyFlag(false)

    const countryCodes = [];
    const countryCodesString = [];

    setCountries(Drzave.countries)
    for (let { code } of Drzave.countries) {
      countryCodesString.push(code)
    }
    setCodesStrings(countryCodesString)

    for (let { code } of Drzave.countries) {
      let obj = {};
      obj[code] = code;
      countryCodes.push(obj)
    }
    setCodes(countryCodes);

    const fetch5London = fetch(request.get5DaysData('London', 'uk'));
    const fetch5Paris = fetch(request.get5DaysData('Paris', 'fra'));
    const fetch5Madrid = fetch(request.get5DaysData('Madrid', 'spa'));

    Promise.all([fetch5London, fetch5Paris, fetch5Madrid]).then(values => {
      return Promise.all(values.map(results => results.json()));
    }).then(([london, paris, madrid]) => {

      let threeCities5Days = [];
      threeCities5Days.push(london, paris, madrid);
      setThreeCities5Days(threeCities5Days)

      const fetch8London = fetch(request.get8DaysData(london.city.coord.lat, london.city.coord.lon));
      const fetch8Paris = fetch(request.get8DaysData(paris.city.coord.lat, paris.city.coord.lon));
      const fetch8Madrid = fetch(request.get8DaysData(madrid.city.coord.lat, madrid.city.coord.lon));

      Promise.all([fetch8London, fetch8Paris, fetch8Madrid]).then(values => {
        return Promise.all(values.map(results => results.json()));
      }).then(([london8, paris8, madrid8]) => {

        let threeCities8Days = [];
        threeCities8Days.push(london8, paris8, madrid8);
        setThreeCities8Days(threeCities8Days)
      });
    });
  }, []);

  const submitSearch = (place) => {
    const { flag, city } = place;
    searchedCity = place.city.toLowerCase();

    setEmptyFlag(false)

    let fiveDaysData = threeCities5Days.find(city => city.city.name.toLowerCase() === searchedCity);
    let cityCode = threeCities5Days.find(city => city.city.country === flag);

    if (fiveDaysData && cityCode) {
      setData5Days(fiveDaysData)
      let weekDaysData = threeCities8Days.find(city => city.lat === fiveDaysData.city.coord.lat);
      setData8Days(weekDaysData)
    }
    else {
      setEmptyFlag(false)
      searchedCity = city.toLowerCase();
      submitRequest(searchedCity, flag, setData5Days, setData8Days)
      setData5Days(data5)
      setData8Days(data8)
    }
  }

  const getTemperatureClass = (temp) => {
    if (temp >= 0 && temp.toString().length == 1) {
      setBg(`plus-0`);
    } else if (temp > 0) {
      setBg(`plus-${String(temp)[0]}0`);
    } else if (temp < 0 && temp.toString().length == 2) {
      setBg(`minus-0`);
    } else {
      setBg(`minus-${String(temp)[1]}0`);
    };
  }

  return (
    <div className={`app ${bg}`}>
      <div className="container">
        <SearchCity
          submit={submitSearch}
          countries={countries}
          codes={codes}
          codesString={codesString}
          setEmptyFlag={setEmptyFlag}
        />
        {emptyFlag && <div>Please select country and type city!</div>}
        {error && !emptyFlag && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {data5Days && !error && !emptyFlag && < FiveDaysTemp data={data5Days} getTemperatureClass={getTemperatureClass} />}
        {data8Days && !error && <div>
          <Weekdays data={data8Days} />
        </div>}

      </div>
    </div >
  );
}

export default App;
