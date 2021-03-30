import React from 'react'

const Persons = ({ personToShow, deletePerson }) => {
  return (
    personToShow.map(person => {
      return (
        <div key={person.id}>
          <span>{person.name} {person.number} </span>
          <button onClick={() => deletePerson(person)}>delete</button>
        </div>
      )
    })
  )
}

export default Persons