import React from 'react'
import HourWeatherCard from '../HourWeatherCard/HourWeatherCard'
import './HourWeatherComponent.css'

const HourWheaterComponent = ({data}) => {
    const hours = ['03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00']
  return (
    <div className='hour-component-component'>
        {
            hours.map((hour, index)=> {
                return <HourWeatherCard key={index} hourString={hour} imgSrc={data[index + 1].condition.icon} temp={data[index + 1].temp_c}/>
            })
        }
    </div>
  )
}

export default HourWheaterComponent