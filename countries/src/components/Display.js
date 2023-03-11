import { useEffect } from "react";
import axios from "axios";

const Display = ({city, weatherData, setWeatherData}) => {

const api_key = process.env.REACT_APP_API_KEY;

useEffect(() => { 
  axios
  .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`)
  .then(response => {
    setWeatherData(response.data);
  })
},[])

console.log(weatherData, "weather test");
  


    return (
        <div>
          <div>temperature {weatherData.main.temp} Celsius</div>
          <div>wind {weatherData.wind.speed} m/s</div>
        </div>
    )
}


export default Display;