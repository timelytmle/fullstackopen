import { useState, useEffect } from 'react'
import backendService from './services/backendFunctions'

const Filter = ({valueVar, changeHandler}) => {
  return (
    <div>filter shown with<input value={valueVar} onChange={changeHandler}/></div>
  )
}

const FormDisplay = ({names, numbers, nameHandler, numberHandler, submitHandler}) => {
  return(
    <form onSubmit={submitHandler}>
      <div>name: <input value={names} onChange={nameHandler}/></div>
      <div>number: <input value={numbers} onChange={numberHandler}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Display = ({shownArray, deleteHandler}) => {
  return(
    <div>
      {shownArray.map(peoples => {
        return(
            <li key={peoples.id}>{peoples.name} - {peoples.number} <button key={peoples.id} onClick={() => deleteHandler(peoples.name, peoples.id)}>delete</button></li>
        )
      })}
    </div>
  )
}

const Notification = ({message, styleType}) => {
  const messageNormal = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const messageError = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  
  if (message === '') {
    return null
  }
  if (styleType === 'normal') {
    return (
      <div style={messageNormal}>
        {message}
      </div>
    )
  }
  if (styleType === 'error') {
    return (
      <div style={messageError}>
        {message}
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState({m:'',s:'normal'})

  useEffect(() => {
    backendService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  const handleSubmit = (event) => {
    event.preventDefault()
    
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        const personArray = persons.filter(person => person.name === newName)
        const personObject = personArray[0]
        const updatedPerson = {...personObject, number: newNumber}
        backendService.update(updatedPerson)
        .then(() => {
          setPersons(persons.map(person => person.name !== newName ? person : {...person, number:newNumber}))
          setMessage({m:`Edited ${newName}'s number`, s:'normal'})
          setNewName('')
          setNewNumber('')
          setTimeout(() => {   
            setMessage('')
          }, 5000)
        })
        .catch(() => {
          setMessage({m:`Information of ${newName} has already been removed from server`, s:'error'})
          setPersons(persons.filter(person => person.name !== newName))
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setMessage('')
          }, 5000)
        })
      }
    }
    else {
      const personObject = { name: newName, number: newNumber}
      backendService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage({m:`Added ${newName}`, s:'normal'})
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setMessage('')
          }, 5000)
        })
    }
  }

  const deletePerson = (personName, personId) => {
    if (window.confirm(`Delete ${personName}?`)) {
      backendService.deleteObj(personId)
      setPersons(persons.filter(person => person.id !== personId))
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
      <Notification message={message.m} styleType={message.s}/>
      <h2>Filter</h2>
      <Filter valueVar={filterName} changeHandler={handleFilter} />
      <h2>Form</h2>
      <FormDisplay names={newName} numbers={newNumber} nameHandler={handleNameChange} numberHandler={handleNumberChange} submitHandler={handleSubmit} />
      <h2>Numbers</h2>
      <Display shownArray={peopleToShow} deleteHandler={deletePerson} />
    </div>
  )
}

export default App