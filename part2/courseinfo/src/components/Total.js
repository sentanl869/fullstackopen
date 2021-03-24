import React from 'react'

const Total = ({ parts }) => {
  const sum_num = () => {
      let total_sum = 0
      for (let part of parts) {
          total_sum += part.exercises
      }
      return (total_sum)
  }
  return (
    <p><b>total of {sum_num()} exercises</b></p>
  )
}

export default Total