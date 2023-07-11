import React from 'react'
import './HourWeatherCard.css'

const HourWeatherCard = ({hourString, imgSrc, temp}) => {
  return (
    <div className='hour-card-container'>
        <h4>{hourString}</h4>
        <img src={imgSrc} alt=''/>
        <h2>{`${temp}°C`}</h2>
    </div>
  )
}

export default HourWeatherCard