import axios from "axios";
import { useState, useEffect } from "react";

function App() {

  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState(null);
  const [countrySearch, setCountrySearch] = useState([]);

  useEffect(() => {
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response =>{
      setCountries(response.data);
    })
},[])

if(!countries){
  console.log("fetching data");
  return null;
} else {
  console.log("data fetched");
}

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCountrySearch(countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())))
    console.log(countrySearch);
  }

  

  if (countrySearch.length === 1){
    
    const languages = countrySearch.map(country => country.languages);
    const flag = countrySearch.map(country => country.flags);
    console.log(flag[0].png);

   let spoken = Object.values(languages[0]);
   console.log(spoken);
   

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
      </div>
     )
    })  }
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

  if (countrySearch.length > 1 && countrySearch.length < 10){
    return(
    <div>
      <form>
      find countries <input value={search} onChange={handleSearch} />
      </form>
      {countrySearch.map(country => {
      return(
        <div key={country.cca2}>
          {country.name.common}
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





/*

 {countrySearch.length >= 10 ? <div>Too many matches,specify another filter</div> : countrySearch.map(country => {
      return(
        <div key={country.cca2}>
          {country.name.common}
        </div>
      )
    })}
*/