import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good, bad, all) => {
    if (all === 0) {
      return (0)
    }
    return ((good - bad) / all)
  }
  const positive = (good, all) => {
    if (all === 0) {
      return('0 %')
    }
    return ((good / all) * 100 + ' %')
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average(good, bad, all)}</p>
      <p>positive {positive(good, all)}</p>
    </div>
  )
}

export default App