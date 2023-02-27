
const Persons = ({personList}) => {


    return(
        <div>
            {personList.map((person) => <div key={person.name}> {person.name} {person.number} </div> )}
        </div>
    )
}


export default Persons;