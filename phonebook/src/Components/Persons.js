
const Persons = ({personList}) => {


    return(
        <div>
            {personList.map((person) => 
            <div key={person.id}> 
            {person.name} 
            {person.number} 
            <button>delete</button>
            </div> )}
        </div>
    )
}


export default Persons;