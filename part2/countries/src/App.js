import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Contries from './components/Contries'

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
        : <Contries countriesToShow={countriesToShow} setCountriesToShow={setCountriesToShow} />
      }
    </>
  )
}

export default App