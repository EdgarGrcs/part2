import { useState } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone,setNewPhone] = useState('');
  const [searchName,setSearchName] = useState('');

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneInput = (event) => {
    setNewPhone(event.target.value);
  }

  const handleSearchName = (event) => {
    setSearchName(event.target.value);

    const list = persons.filter((names) => names.name.toLowerCase().includes((event.target.value).toLowerCase()))
  
    setPersons(list);
  }

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)){
       return alert(`${newName} is already added to phonebook`)
    } else {
      const personObject =  {
        name: newName,
        number: newPhone
      }
      setPersons(persons.concat(personObject));
    }
    setNewName("");
    setNewPhone("");
  }


//Persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter value={searchName} onChange={handleSearchName}/>
      </div>
      <form onSubmit={addPerson}>
      <h2>add new</h2>
        <PersonForm name={newName} phone={newPhone} handleName={handleNameInput} handlePhone={handlePhoneInput}  />
      </form>
      <h2>Numbers</h2>
        <Persons personList={persons} />
    </div>
  )
}

export default App