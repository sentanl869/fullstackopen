import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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
      setPersons(persons.concat(personObject))
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