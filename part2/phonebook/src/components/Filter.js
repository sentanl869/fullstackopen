import React from 'react'

const Filter = ({ newFilter, handelFilterChange }) => {
  return (
    <div>
      filter shown with <input value={newFilter} onChange={handelFilterChange}/>
    </div>
  )
}

export default Filter