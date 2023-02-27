
const PersonForm = (props) => {

    return(
        <div>
         <div>
          name: <input value={props.name} onChange={props.handleName} />
          <div>
            number: <input value={props.phone} onChange={props.handlePhone}/>
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        </div>
    )

}



export default PersonForm;