import { useEffect, useState } from 'react'

import './App.css'
import axios from 'axios'
import CardWeather from './components/CardWeather'

function App() {
  
  const [city, setCity] = useState()
  const [cityData, setCityData] = useState(null)

  const [coords, setCoords] = useState()

  const [weatherDesciption, setWeatherDesciption] = useState('')

  const API_KEY='0d59a4d99626ce808de9391eab229d00'

  const getDataLocation=pos=>{
    const obj={
      lat: pos.coords.latitude,
      lon: pos.coords.longitude

    }
    setCoords(obj)

    console.log(pos)
  }

  //Obtener las coordenadas al cagar la pagina
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getDataLocation)

  }, [])
  

  //para obtener informacion del clima cuando la ciudad cambia 
  useEffect(() => {
    if(coords){

      const {lat,lon}=coords
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
      .then(res=>{
        setCity(res.data.name)
        console.log(res.data.name)

      })
      .catch(err=>{
        console.log(err)
      })
    }
  }, [coords])
  


  useEffect(() => {

    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`

    axios.get(url)
    .then(res=>{
        
      setWeatherDesciption(res.data.weather[0].description)
    
      setCityData(res.data)
    })
    .catch(err=>{
      console.log(err)
    })


   
  }, [city])



  const getBackground =()=>{

    const classMapping={
      'clear sky': 'clear-sky',
      'scattered clouds':'scattered-clouds',
      'overcast clouds':'overcast-clouds'
    }
    console.log(classMapping[weatherDesciption])

    return classMapping[weatherDesciption]||'default-background'
  }

  console.log(city)
  

  return (
    <div className={`app ${getBackground()}`}>
      <CardWeather
        cityData={cityData}
        setCityData={setCityData}
        API_KEY={API_KEY}
        setCity={setCity}
      />
    
    </div>
  )
}

export default App
