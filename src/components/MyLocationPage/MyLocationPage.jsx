import React, {useEffect, useState} from 'react'
import {BiCurrentLocation} from 'react-icons/bi'

const MyLocationPage = ({BASE_URL, API_KEY}) => {
    const [dataMyLocationNow, setDataMyLocationNow] = useState({})
    // useEffect(() => {
    //     fetch(`${BASE_URL}current.json?key=${API_KEY}&q=Bucharest`)
    //     .then(response => response.json())
    //     .then(setDataMyLocationNow)
    //   },[])
      const fetchUserData = () => {
        return fetch(`${BASE_URL}current.json?key=${API_KEY}&q=Bucharest`)
                .then((res) => res.json())
                  .then((d) => setDataMyLocationNow(d))
      }
    
      useEffect(() => {
        fetchUserData()
      }, [])
  return (
    <div>
      <h2>Bucharest <BiCurrentLocation/></h2>
      <h1>{dataMyLocationNow.current.temp_c}</h1>
    </div>
  )
}

export default MyLocationPage