import React from 'react'

function FiveDaysTemp({ data, getTemperatureClass }) {
  let firstDay = new Date(data.list[0].dt_txt).toLocaleDateString(undefined, { day: 'numeric', month: 'long' })
  let fifthDay = new Date(data.list[data.list.length - 1].dt_txt).getUTCDate().toString()
  let year = new Date(data.list[data.list.length - 1].dt_txt).getUTCFullYear().toString()

  let temp = data.list.reduce((sum, object) => {
    let zbir = sum + object.main.temp;
    return zbir;
  }, 0);

  temp /= data.list.length;
  temp = Math.round(temp);
  getTemperatureClass(temp);


  return (
    <div className="five-days-temp">
      <div className="inner-container">
        <h5 className="date-header">{firstDay} - {fifthDay} {year}</h5>
        <div className="temp-container">
          <div className="average-temp">{temp}</div>
          <span className="average-degrees-symbol">°C</span>
        </div>
      </div>
    </div>
  )
}

export default FiveDaysTemp