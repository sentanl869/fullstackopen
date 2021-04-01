import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ message, setMessage ] = useState(null)

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
            setMessage({
              content: `Upgrade ${returnedPerson.name} success`,
              type: 'success'
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessage({
              content: `Information of ${newName} has already been removed from server`,
              type: 'error'
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      const personObject = { name: newName, number: newNumber }
      personService
        .createItem(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage({
            content: `Add ${returnedPerson.name} success`,
            type: 'success'
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
  }
  const deletePerson = target => {
    if (window.confirm(`Delete ${target.name} ?`)) {
      personService
        .deleteItem(target.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== target.id))
          setMessage({
            content: `Delete ${target.name} success`,
            type: 'success'
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setPersons(persons.filter(person => person.id !== target.id))
          setMessage({
            content: `Information of ${newName} has already been removed from server`,
            type: 'error'
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
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
      <Notification message={message} />
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