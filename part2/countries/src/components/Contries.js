import React from 'react'
import Country from './Country'

const Contries = ({ countriesToShow, setCountriesToShow }) => {
  if (countriesToShow.length === 1) {
    return (<Country country={countriesToShow[0]} />)
  } else {
    return (
      countriesToShow.map(country =>
        <div key={country.area}>
          {country.name}
          <button onClick={() => {setCountriesToShow([country])}}>show</button>
        </div>
      )
    )
  }
}

export default Contries