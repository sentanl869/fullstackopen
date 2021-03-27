import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Contries = ({ countriesToShow }) => {
  if (countriesToShow.length === 1) {
    return (
      <>
        <h1>{countriesToShow[0].name}</h1>
        <p>capital: {countriesToShow[0].capital}</p>
        <p>population: {countriesToShow[0].population}</p>
        <h3>languages</h3>
        <ul>
          {countriesToShow[0].languages.map(language =>
            <li key={language.name}>{language.name}</li>
          )}
        </ul>
        <img src={countriesToShow[0].flag} alt={countriesToShow[0].name} width='200px'/>
      </>
    )
  } else {
    return (
      countriesToShow.map(country =>
        <div key={country.area}>{country.name}</div>
      )
    )
  }
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ countriesToShow, setCountriesToShow ] = useState([])
  const [ filterCountry, setFilterCountry ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setFilterCountry(event.target.value)
    setCountriesToShow(countries.filter(country =>
      country.name.toLowerCase().includes(event.target.value.toLowerCase())
    ))
  }

  return (
    <>
      <span>find countries <input value={filterCountry} onChange={handleSearchChange}/></span>
      {countriesToShow.length > 10
        ? <p>Too many matches, specify another filter</p>
        : <Contries countriesToShow={countriesToShow} />
      }
    </>
  )
}

export default App