
const Persons = ({id,name, number, handleDelete}) => {


    return(
        <div>
           {name} {number} <button key={id} onClick={handleDelete}>delete</button>
        </div>
    )
}


export default Persons;