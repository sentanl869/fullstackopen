import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personToShow = showAll
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )

  const addperson = (event) => {
    event.preventDefault()
    const checkArray = persons.filter(person => person.name === newName)
    if (checkArray.length > 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = { name: newName, number: newNumber }
      personService
        .createItem(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    setNewName('')
    setNewNumber('')
  }
  
  const handelNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handelNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handelFilterChange = (event) => {
    setNewFilter(event.target.value)
    if (event.target.value.length > 0) {
      setShowAll(false)
    } else {
      setShowAll(true)
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handelFilterChange={handelFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addperson={addperson}
        newName={newName}
        newNumber={newNumber}
        handelNameChange={handelNameChange}
        handelNumberChange={handelNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personToShow={personToShow} />
    </>
  )
}

export default App