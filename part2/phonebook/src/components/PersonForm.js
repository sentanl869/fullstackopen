import React from 'react'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addperson}>
      <div>
        name: <input value={props.newName} onChange={props.handelNameChange}/>
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handelNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm