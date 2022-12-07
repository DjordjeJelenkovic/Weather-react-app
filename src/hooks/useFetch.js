import { useState, useEffect } from 'react';
import request from '../Requests';

const useFetch = () => {
  const [data5, setData5] = useState(null);
  const [data8, setData8] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const submitRequest = (searchedCity, flag, setData5Days, setData8Days) => {
    setIsPending(true);
    fetch(request.get5DaysData(searchedCity, flag))

      .then(res => {
        if (!res.ok) {
          throw Error('Please check your inputs and try again! :)');
        }
        return res.json();
      })
      .then(res => {
        setIsPending(false);
        setData5(res);
        setData5Days(res)
        setError(null);
        fetchWithCoords(res?.city.coord.lat, res?.city.coord.lon, setData8Days)
      })
      .catch(err => {
        setIsPending(false);
        setError(err.message);
      })

  }
  const fetchWithCoords = async (lat, lon, setData8Days) => {
    try {
      const response = await fetch(request.get8DaysData(lat, lon))
      if (!response.ok) {
        throw Error('could not fetch the data for that resource');
      }
      const data = await response.json();
      setData8(data)
      setData8Days(data)
      setIsPending(false);
      setError(null);
    }
    catch (err) {
      setIsPending(false);
      setError(err.message);
    }
  }

  return { submitRequest, data5, data8, isPending, setError, error };
}

export default useFetch;