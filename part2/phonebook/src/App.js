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

  const addPerson = (event) => {
    event.preventDefault()
    const checkPerson = persons.find(person => person.name === newName)
    if (checkPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changePerson = { ...checkPerson, number: newNumber }
        personService
          .updateItem(checkPerson.id, changePerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== checkPerson.id ? person : returnedPerson))
          })
      }
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
  const deletePerson = target => {
    if (window.confirm(`Delete ${target.name} ?`)) {
      personService
        .deleteItem(target.id)
        .then(() => setPersons(persons.filter(person => person.id !== target.id)))
    }
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
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handelNameChange={handelNameChange}
        handelNumberChange={handelNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personToShow={personToShow} deletePerson={deletePerson} />
    </>
  )
}

export default App