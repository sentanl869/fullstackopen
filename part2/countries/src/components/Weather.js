import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Weather = ({ capital }) => {
  const [ weather, setWeather ] = useState({})

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => {
        setWeather(response.data.current)
      })
  }, [capital])

  return (
    <>
      <h3>Weather in {capital}</h3>
      <p><b>temperature</b>: {weather.temperature} Celcius</p>
      <img
        src={weather.weather_icons}
        alt={weather.weather_descriptions}
        width='100px'
      />
      <p><b>wind</b>: {weather.wind_speed} mph direction {weather.wind_dir}</p>
    </>
  )
}

export default Weather