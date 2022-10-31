import React from 'react';
import axios from 'axios'
import { useState, useEffect } from 'react'
import 'boxicons'



const Weather = () => {

    const [weather, setWeather] = useState({})
    const celsius = weather.main?.temp - 273.15
    const fahrenheit = (celsius * 9 / 5) + 32

    const [isCelsius, setIsCelsius] = useState(true)
    useEffect(() => {
        const success = pos => {

            const lat = pos.coords.latitude
            const lon = pos.coords.longitude
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ae03bc960a3c078ab0bf784833006a11`)
                .then(res => setWeather(res.data))
        }
        //https://api.openweathermap.org/data/2.5/weather?lat=20.0838&lon=-98.7756&appid=ae03bc960a3c078ab0bf784833006a11
        navigator.geolocation.getCurrentPosition(success)
    }, [])
    const country = weather.sys?.country
    const city = weather.name

    const changeTemp = () => {
        setIsCelsius(!isCelsius)
    }
    return (
        <div className='weather-card'>
            <div className='card-content'>
                <h1>Weather App</h1>
                <h3>{`${city}, ${country}`}</h3>

                <div className='weather-info'>
                    <ul className='weather-description'>
                        <li className='weather'>{`"${weather.weather?.[0].description}"`}</li>
                        <li><box-icon name='wind' color='gray'></box-icon><b>Wind speed:</b> {weather.wind?.speed} m/s</li>
                        <li><box-icon name='cloud' type='solid'color='gray' ></box-icon><b>Clouds:</b> {weather.clouds?.all}%</li>
                        <li><box-icon name='thermometer' type='solid' color='gray'></box-icon><b>Pressure:</b> {weather.main?.pressure}mb</li>
                    </ul>
                    <ul className='weather-icon'>
                        <li><img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" /></li>
                        <li>{isCelsius ? `${celsius.toFixed(2)} °C` : `${fahrenheit.toFixed(2)} °F`}</li>
                    </ul>
                </div>
                <button onClick={changeTemp}>{isCelsius ? 'Degrees °F' : 'Degrees °C'}</button>
            </div>
        </div>
    );
};

export default Weather;