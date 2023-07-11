import { useState, useEffect } from 'react'
import ForecastedDay from './components/ForecastedDay/ForecastedDay'
import HourWheaterComponent from './components/HourWeatherComponent/HourWheaterComponent'
import {AiOutlineArrowRight}from 'react-icons/ai'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import MyLocationPage from './components/MyLocationPage/MyLocationPage'
import axios from 'axios'
import './App.css'
function App() {
  const [dataApiNow, setDataApiNow] = useState()
  const [dataApiForecastByDays, setDataApiForecastByDays] = useState({})
  const [displayForecastedData, setDisplayForecastedData] = useState(true)
  const [day, setDay] = useState(0)
  const [numberOfDaysProjected, setNumberOfDaysProjected] = useState('')
  const [displayData, setDisplayData] = useState(false)
  const [city, setCity] = useState('')
  const BASE_URL = 'https://api.weatherapi.com/v1/', API_KEY = '8630ff89e58549dba2d82630230707'

  // useEffect(() => {
  //   if (!city) return;

  //   async function fetchData() {
  //     const response = await fetch(
  //       `${BASE_URL}current.json?key=${API_KEY}&q=${city}`
  //     );
  //     const data = await response.json();
  //     const results = data.Search;
  //     setDataApiNow(results);
  //   }

  //   fetchData();
  // }, [city]);

  // const handleSubmitByCity = (e) => {
  //   e.preventDefault();
  //   setCity(city);
  //   if(dataApiNow !== undefined)
  //     setDisplayData(true)
  // };
  const handleArrows = () => {
    if(day === 0){
      return <><h4>{`Date: ${dataApiForecastByDays.forecast.forecastday[day].date}`}</h4><AiOutlineArrowRight className='arrow-switch-date' onClick={() => {setDay(day + 1)}}/></>
    }else if(day !== numberOfDaysProjected - 1)
      return <>
      <AiOutlineArrowLeft className='arrow-switch-date' onClick={() => {setDay(day - 1)}}/>
      <h4>{`Date: ${dataApiForecastByDays.forecast.forecastday[day].date}`}</h4>
      <AiOutlineArrowRight className='arrow-switch-date' onClick={() => {setDay(day + 1)}}/>
      </>
    else
      return <>
      <AiOutlineArrowLeft className='arrow-switch-date' onClick={() => {setDay(day - 1)}}/>
      <h4>{`Date: ${dataApiForecastByDays.forecast.forecastday[day].date}`}</h4>
      </>
  }
  const handleSubmitByCity = (e) => {
    e.preventDefault()
    if (!city) return;
    // axios.get(`${BASE_URL}current.json?key=${API_KEY}&q=${city}`).then((response) => setDataApiNow(response.data))
    fetch(`${BASE_URL}current.json?key=${API_KEY}&q=${city}`)
      .then((response) => response.json())
      .then(setDataApiNow)
    if(dataApiNow !== undefined)
      setDisplayData(true)
    }
  const handleSubmitByProjection = (e) => {
    e.preventDefault()
    fetch(`${BASE_URL}forecast.json?key=${API_KEY}&q=${city}&days=${numberOfDaysProjected}`)
    .then((response) => response.json())
    .then(setDataApiForecastByDays)
    if(dataApiForecastByDays !== undefined){
      setDisplayForecastedData(true)
    }
  }

  return (
    <div className = 'App'>
      <form onSubmit={handleSubmitByCity}>
        <label htmlFor='city-input'>Type City:</label>
        <input type='text' id='city-input' value={city} onChange={(e) => {setCity(e.target.value)}} />
        <input type='submit' value='Submit' />
      </form>
        {
          displayData ? <div>
            <h2>Right Now:</h2>
            <ul>
              <li>{`Temperature: ${dataApiNow.current.temp_c}°C`}</li>
              <li>{`Humidity: ${dataApiNow.current.humidity}`}</li>
              <li>{`Wind Speed: ${dataApiNow.current.wind_kph}kph`}</li>
              <li>{`Precipitation: ${dataApiNow.current.precip_mm}mm`}</li>
            </ul>
            <h3>Enter the number of days to get a projection: </h3>
            <input type="number" id="quantity" name="quantity" min="1" max="30" onChange={(e) => {console.log(numberOfDaysProjected); setNumberOfDaysProjected(e.target.value)}}/>
            <input type="submit" onClick={(e) => handleSubmitByProjection(e)}/>
            {
              displayForecastedData ?<div>
                <ul>
                  <div className='switch-date'>
                    {handleArrows()}
                  </div>
                  <ForecastedDay data={dataApiForecastByDays.forecast.forecastday[day]}/>
                  <HourWheaterComponent data={dataApiForecastByDays.forecast.forecastday[day].hour}/>
                </ul>
              </div> : 
              ''
            }
          </div> :
          ''
        }
    {/* <MyLocationPage BASE_URL={BASE_URL} API_KEY={API_KEY} /> */}
    </div>
  )
  
}

export default App
