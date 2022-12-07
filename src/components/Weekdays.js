import React from 'react'
import Weekday from './Weekday'

function Weekdays(data8Days) {

  return (
    <div className="weekdays">
      <Weekday data={data8Days.data.daily[0]} />
      <Weekday data={data8Days.data.daily[1]} />
      <Weekday data={data8Days.data.daily[2]} />
      <Weekday data={data8Days.data.daily[3]} />
      <Weekday data={data8Days.data.daily[4]} />
      <Weekday data={data8Days.data.daily[5]} />
      <Weekday data={data8Days.data.daily[6]} />
    </div>
  )
}

export default Weekdays