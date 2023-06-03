import { useState } from 'react'

const Filter = ({valueVar, changeHandler}) => {
  return (
    <div>filter shown with<input value={valueVar} onChange={changeHandler}/></div>
  )
}

const FormSubmit = ({names, numbers, nameHandler, numberHandler, submitHandler}) => {
  return(
    <form onSubmit={submitHandler}>
      <div>name: <input value={names} onChange={nameHandler}/></div>
      <div>number: <input value={numbers} onChange={numberHandler}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Display = ({shownArray}) => {
  return(
    <div>{shownArray.map(peoples => <li key={peoples.name}>{peoples.name} - {peoples.number}</li>)}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = {name: newName, number: newNumber}
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterName(event.target.value)
  }

  const peopleToShow = filterName.length > 0 ? persons.filter(person =>  person.name.toLowerCase().includes(filterName.toLowerCase())) : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Filter</h2>
      <Filter valueVar={filterName} changeHandler={handleFilter} />
      <h2>Form</h2>
      <FormSubmit names={newName} numbers={newNumber} nameHandler={handleNameChange} numberHandler={handleNumberChange} submitHandler={handleSubmit} />
      <h2>Numbers</h2>
      <Display shownArray={peopleToShow} />
    </div>
  )
}

export default App