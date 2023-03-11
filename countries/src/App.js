import axios from "axios";
import { useState, useEffect } from "react";
import Display from "./components/Display";

function App() {

  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState(null);
  const [countrySearch, setCountrySearch] = useState([]);
  const [weatherData, setWeatherData] = useState("");

  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response =>{
      setCountries(response.data,);
    })
},[])

const api_key = process.env.REACT_APP_API_KEY;

if(!countries){
  console.log("fetching data");
  return null;
} else {
  console.log("data fetched");
}

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCountrySearch(countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())))
  }

  

  if (countrySearch.length === 1){

    
    
    const languages = countrySearch.map(country => country.languages);
    const flag = countrySearch.map(country => country.flags); 
    const city = countrySearch[0].capital[0]
   
   let spoken = Object.values(languages[0]);
   

    return(
      <div>
        <form>
        find countries <input value={search} onChange={handleSearch} />
        </form>
        {countrySearch.map(country => {
     
     return (
     <div key={country.cca2}> 
        <h2>{country.name.common}</h2>
       
       <div> capital {country.capital[0]}</div>
       <div> area {country.area} </div>
       <h3>languages:</h3>
        {spoken.map(lang => <li>{lang}</li>)}
        {<img src={flag[0].png} alt="flag"/>}
        <h3>Weather in {country.capital[0]}</h3>
        <Display city={city} weatherData={weatherData} setWeatherData={setWeatherData} />
      </div>
     )
    }) }
    
      </div>
    )
  }
  

  if (countrySearch.length >= 10){
    
    return(
    <div>
      <form>
      find countries <input value={search} onChange={handleSearch} />
      </form>
      <div>Too many matches,specify another filter</div>
    </div>
    )
    
  }


  const showCountry = (id) => {
    setCountrySearch(countries.filter(country => country.name.common.toLowerCase().includes(id.currentTarget.id.toLowerCase())))

  }


  if (countrySearch.length > 1 && countrySearch.length < 10){
    return(
    <div>
      <form>
      find countries <input value={search} onChange={handleSearch} />
      </form>
      {countrySearch.map(country => {
      return(
        <div key={country.cca2}>
          {country.name.common} <button id={country.name.common} onClick={showCountry}>show</button>
        </div>
      )
    })  }
    </div>
    )
  }




  return (
    <div>
      <form>
      find countries <input value={search} onChange={handleSearch} />
      </form>
    </div>
  );
}

export default App;


