import React, { useState } from 'react'

const Button = (props) => {
  return (
    <>
      <button onClick={props.handlerClick}>{props.text}</button>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const setRandomAnecote = () => {
    const selectNum = Math.floor(Math.random() * anecdotes.length)
    setSelected(selectNum)
  }
  const setAnecoteVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handlerClick={setAnecoteVote} text='vote' />
      <Button handlerClick={setRandomAnecote} text='next anecdotes' />
    </div>
  )
}

export default App