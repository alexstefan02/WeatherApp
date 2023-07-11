import React from 'react'

const ForecastedDay = ({data}) => {
  return (
    <div>
        <ul>
            <li>{`Average Temperature: ${data.day.avgtemp_c}°C`}</li>
            <li>{`Humidity: ${data.day.avghumidity}`}</li>
            <li>{`Wind Speed: ${data.day.maxwind_kph}kph`}</li>
            <li>{`Precipitation: ${data.day.totalprecip_mm}mm`}</li>
        </ul>

    </div>
  )
}

export default ForecastedDay