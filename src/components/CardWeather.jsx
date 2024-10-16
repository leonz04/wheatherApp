import React, { useEffect, useRef, useState } from 'react'

import "./styles/CardWeather.css"
import { functionsIn } from 'lodash'
import axios from 'axios'

const CardWeather = ({cityData,API_KEY,setCityData,setCity}) => {

    const [temp, setTemp] = useState(null)

    const [isCelsius, setIsCelsius] = useState(true)

    const inputCity = useRef()

    

    useEffect(() => {
        const celsius= (cityData?.main?.temp-273.15).toFixed(1)
        const obj={
        celsius:celsius,
        farentheit:((cityData?.main?.temp-273.15)*(9/5)+32).toFixed(1)
        }
      setTemp(obj)
      console.log(celsius)
    }, [cityData])
    

    function changeTemp(){
        setIsCelsius(!isCelsius)

    }

    const searchCity =(event)=>{
        
        
        event.preventDefault()

        setCity(inputCity.current.value)



        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity.current.value}&appid=${API_KEY}`)
        .then(res=>{
            console.log(res.data)
            setCityData(res.data)
        })
        .catch(err=>console.log(err))
    }


   
    if(!temp){
        return <h1>cargando</h1>
    }
    
  return (
    <article className='card_weather'>
        <h2 className='card_weatherTitle'>{cityData?.name}</h2>
        <h4 className='card_weatherDescription'>"{cityData?.weather[0].description}"</h4>

        <h3 className='card_weatherTemp'>
            {isCelsius?
            `${temp?.celsius} °C`
            :`${temp?.farentheit} °F`
            }
        </h3>


        <div className='container'>
        <img className='imgIcon' src={`https://openweathermap.org/img/wn/${cityData?.weather[0].icon}@2x.png`} alt=''/>
            <ul className='containerInfo'>
                <li className='item_info'>Coordenadas<br/><span className='item_info_data'>lat:{cityData?.coord.lat},lon:{cityData?.coord.lon}</span></li>
                <li className='item_info'>Presion <br/><span className='item_info_data'>{cityData?.main.pressure} hPa</span> </li>
                <li className='item_info'>Humedad <br/><span className='item_info_data'>{cityData?.main.humidity}%</span></li>
                <li className='item_info'>Velocidad Viento <br/><span className='item_info_data'>{cityData?.wind.speed} m/s</span></li>
                <li className='changeTemp' onClick={changeTemp}>Cambiar Temperatura</li>

            </ul>
        </div>

        <form onSubmit={searchCity}>
            <input ref={inputCity} placeholder='Ingrese Ciudad'/>
            <button type='submit'>Consultar</button>
        </form>

    </article>
  )
}

export default CardWeather