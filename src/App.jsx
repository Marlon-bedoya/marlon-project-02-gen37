
import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './Components/WeatherCard'
import axios from 'axios'
import Loading from './Components/Loading'

function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)



  const success = info => {
    setCoords({
      lat: info.coords.latitude,
      lon: info.coords.longitude
    })
  }

  const error = () => {
    setHasError(true)
    setIsLoading(false)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success) 
  }, [])
  

  useEffect(() => {
    if (coords) {

      const APIKEY = '9072a1710a277a51395c71e4048e305f'
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
      
        axios.get(url)
         .then(res =>{ 
          setWeather(res.data)
          const celsius = (res.data.main.temp - 273.15).toFixed(1)
          const fahrenheit = ((9/5 * celsius) +32).toFixed(1)
          setTemp({
            celsius,
            fahrenheit
         })
        })
         .catch(err => console.log(err))
         .finally(() => setIsLoading(false))

    }
  }, [coords])
  


  return (
   <div className='app'>

    {
      isLoading 
      ? <Loading
      />
      : (
        hasError 
        ? <h1>❌Do not block the location, please activate location.😩</h1>
        : (
          <WeatherCard 
              weather={weather}
              temp={temp}
            />
        )
      )
    }
   </div>
  )
}

export default App
