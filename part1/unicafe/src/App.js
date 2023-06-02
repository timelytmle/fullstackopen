import { useState } from 'react'

const Button = ({handleClick, name}) => {
  return(<button onClick={handleClick}>{name}</button>)
}

const StatisticsLine = ({text, value}) => {
  return(<tr><td>{text}</td><td>{value}</td></tr>)
}

const Statistics = ({goodValue, neutralValue, badValue, allValue}) => {
  if (allValue === 0) {
    return (<p>No feedback given</p>)
  }
  
  return(
    <table>
      <StatisticsLine text='good' value={goodValue}/>
      <StatisticsLine text='neutral' value={neutralValue}/>
      <StatisticsLine text='bad' value={badValue}/>
      <StatisticsLine text='all' value={allValue}/>
      <StatisticsLine text='average' value={(goodValue-badValue)/allValue}/>
      <StatisticsLine text='positive' value={goodValue/allValue}/>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedAll = all + 1
    setGood(updatedGood)
    setAll(updatedAll)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedAll = all + 1
    setNeutral(updatedNeutral)
    setAll(updatedAll)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedAll = all + 1
    setBad(updatedBad)
    setAll(updatedAll)
  }

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} name='good'/>
      <Button handleClick={handleNeutralClick} name='neutral'/>
      <Button handleClick={handleBadClick} name='bad'/>
      <h1>statistics</h1>
      <Statistics goodValue={good} neutralValue={neutral} badValue={bad} allValue={all}/>
    </>
  )
}

export default App