import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addperson = (event) => {
    event.preventDefault()
    const checkArray = persons.filter(person => person.name === newName)
    if (checkArray.length > 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = { name: newName }
      setPersons(persons.concat(personObject))
    }
    setNewName('')
  }
  const handelNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addperson}>
        <div>
          name: <input value={newName} onChange={handelNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <p key={person.name}>{person.name}</p>
      )}
    </>
  )
}

export default App