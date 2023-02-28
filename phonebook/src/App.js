import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import axios from 'axios'
import personBackend from './services/ListBackend'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone,setNewPhone] = useState('');
  const [searchName,setSearchName] = useState('');


  //phonebook step 9 not finished, add delete


  useEffect(() => {
    personBackend
    .getAll()
    .then(response => {
      setPersons(response.data);
    })

  },[])

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

      personBackend
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
    }
    setNewName("");
    setNewPhone("");
  }

  const handleDelete = (id) => {

    
   let personList = persons.filter(person => id !== person.id); // all which are not
   let personList2 = persons.filter(person => id === person.id); //single object

   console.log(personList2[0].name)

   if (window.confirm(`Delete ${personList2[0].name} ?`)){
   personBackend
    .remove(id,personList2)
    .then(response => {
      setPersons(personList);
    })
  }

  }

  
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
        {persons.map(person => 
        <Persons key={person.id} name={person.name} number={person.number} handleDelete={() => handleDelete(person.id)}/>  
          )}
       
    </div>
  )
}

export default App