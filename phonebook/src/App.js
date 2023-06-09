import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import personBackend from './services/ListBackend'
import Notification from './Components/Notification'
import Error from './Components/Error'
import { logDOM } from '@testing-library/react'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone,setNewPhone] = useState('');
  const [searchName,setSearchName] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

 
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
    if (persons.some(person => person.name.toLowerCase() === newName) && persons.some(person => person.number === newPhone)){
       return alert(`${newName} is already added to phonebook`)
    } 
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase()) && persons.some(person => person.number !== newPhone)){
    
      if( window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.filter(person => newName.toLowerCase() === person.name.toLowerCase());
        person[0].number = newPhone;
        personBackend
        .update(person[0].id,person[0])
        .then(response => {
          setPersons(persons.map(person => person.name !== newName ? person : response.data ))
        })
        return
      }
    }
      const personObject =  {
        name: newName,
        number: newPhone
      }

      personBackend
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setMessage(`Added ${newName}`);
            setTimeout(() => {
              setMessage(null)
            },5000);
          setNewName("");
          setNewPhone("");
        }).catch(error => {
          setErrorMessage(error.message );
          setTimeout(() => {
            setErrorMessage(null)
          },5000);
          setNewName("");
          setNewPhone("");
        })
        // error.response.data.ValidationError doesnt work in accessing the error message from mongoose validator
  }

  const handleDelete = (id) => {
   let personList = persons.filter(person => id !== person.id); // all which are not
   let personList2 = persons.filter(person => id === person.id); //single object

   if (window.confirm(`Delete ${personList2[0].name} ?`)){
   personBackend
    .remove(id,personList2)
    .then(response => {
      setPersons(personList);
    }).catch((error) => {
      setErrorMessage(`Information of ${personList2[0].name} has already been removed from server`);
      setTimeout(() => {
        setErrorMessage(null)
      },5000);
    setPersons(persons.filter(n => n.id !== id));
    })
  }
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Error errorMessage={errorMessage}/>
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