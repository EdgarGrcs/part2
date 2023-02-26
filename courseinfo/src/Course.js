import Header from "./Components/Header";
import Part from "./Components/Part";

const Course = (props) => {

    const {course} = props;


    return (
        <div>
         {course.map((names) => (
            <>
           <Header key={names.id} name={names.name}/>
           {names.parts.map((part) => (
            <>
            <Part key={part.id} name={part.name} exercises={part.exercises}/>
            </>
           )
           )}
           <h4>total of {names.parts.reduce((sum,part) => (sum += part.exercises),0)} exercises </h4>
           </>
         ))}
        </div>
    )
}


export default Course;

