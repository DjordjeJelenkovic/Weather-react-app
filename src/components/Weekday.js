import React from 'react'

function Weekday(data) {

  let datum = new Date(data.data.dt * 1000).toLocaleDateString(undefined, { weekday: 'long' })
  let temperature = data.data.temp.day
  temperature = Math.round(temperature);
  return (
    <div className="five-days-temp">
      <h5>{datum}</h5>
      <div className="temp-container">
        <p className="weekday-temp">{temperature}</p>
        <span id="weekday-degrees-symbol">°C</span>
      </div>
    </div>
  )
}

export default Weekday
