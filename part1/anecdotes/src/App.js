import { useState } from 'react'

const Button = ({handleClick, name}) => {
  return(<button onClick={handleClick}>{name}</button>)
}

const QuoteDisplay = ({heading, quote}) => {
  return (
    <>
      <h1>{heading}</h1>
      <p>{quote}</p>
    </>
  )
}

const VoteDisplay = ({voteCount}) => {
  return (
    <p>has {voteCount} votes</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [highest, setHighest] = useState(0)
  const [quoteVotes, setVotes] = useState({
    0:0,
    1:0,
    2:0,
    3:0,
    4:0,
    5:0,
    6:0,
    7:0
  })

  const randomAnecdote = () => {
    const updatedSelected = Math.floor(Math.random()*8)
    setSelected(updatedSelected)
  }

  const handleVote = () => {
    const newVote = {...quoteVotes}
    newVote[selected] += 1
    setVotes(newVote)
    if (newVote[selected] > newVote[highest]) {
      setHighest(selected)
    }
  }

  return (
    <>
      <QuoteDisplay heading='Anecdote of the day' quote={anecdotes[selected]}/>
      <div>
        <VoteDisplay voteCount={quoteVotes[selected]}/>
        <Button handleClick={handleVote} name='Vote'/>
        <Button handleClick={randomAnecdote} name='Next Anecdote'/>
      </div>
      <QuoteDisplay heading='Anecdote with most votes' quote={anecdotes[highest]}/>
    </>
  )
}

export default App