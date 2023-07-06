import React from 'react'
import './app.css';
import { useState } from 'react';
import { useEffect } from 'react';



const App = () => {
    let [wind,setWind] = useState();
    let [tempreture,setTempreture] = useState("");
    let [humidity,setHumidity] = useState("");
    let [location,setLocation] = useState("Peshawar");
    let [satuation,setSatuation] = useState("");
    let [visibility,setVisibility] = useState("");
    let [inputV,setInputV] = useState("");
    let [icon,setIcon] = useState("");
    let DATE = new Date();
    let dayName = "";
    let day = DATE.getDay()
    if (day === 0) {
        dayName = "Sunday";
    }else if (day === 1) {
        dayName = "Monday"
    }else if (day === 2) {
        dayName = "Tuesday"
    }else if (day === 3) {
        dayName = "Wennesday"
    }else if (day === 4) {
        dayName = "Thursday"
    }else if (day === 5) {
        dayName = "Friday"
    }else if (day === 6) {
        dayName = "Saturday";
    }

   
async function getData() {
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=12415e30697fda7de0b9eac069017c41&units=metric`)
    let data = await res.json()
    console.log(data);
    if (data.name != null) {
        setLocation(data.name)
    setWind(Math.round(data.wind.speed))
    setTempreture(Math.round(data.main.temp))
    setVisibility(data.visibility)
    setHumidity(data.main.humidity)
    setSatuation(data.weather[0].main)
         if (data.weather[0].main === "Clouds") {
        setIcon("mdi mdi-clouds");
    }else if (data.weather[0].main === "Haze") {
        setIcon("mdi mdi-weather-partly-rainy")
    }else if (data.weather[0].main === "Rain") {
        setIcon("mdi mdi-weather-pouring")
    }else if (data.weather[0].main === "clear") {
        setIcon("mdi mdi-white-balance-sunny") 
    }else if (data.weather[0].main === "Mist") {
        setIcon("mdi mdi-weather-fog") 
    }else if (data.weather[0].main === "Drizzle") {
        setIcon("mdi mdi-weather-rainy") 
    }
    }else{
        setLocation("NOT CORRECT LOCATION!")
        setWind("-")
        setTempreture("-")
        setVisibility("-")
        setHumidity("-")
        setSatuation("-")
    }
   
    console.log(icon);
} 

useEffect(() => {
  getData()
}, [location])



function change(e) {
    setInputV(e.target.value);
}

function search() {
    setLocation(inputV);
}



  return (
    <>
<div className="container">
  <div className="weather-side">
    <div className="weather-gradient"></div>
    <div className="date-container">
      <h2 className="date-dayname">{dayName}</h2><span className="date-day">{DATE.getDate()}-{DATE.getMonth()}-{DATE.getFullYear()}</span><i className="location-icon" data-feather="map-pin"></i><span className="location">{location}</span>
    </div>
    <div className="weather-container"><i className="weather-icon" data-feather="sun"></i>
      <h1 className="weather-temp">{tempreture}°C</h1>
      <h3 className="weather-desc">{satuation}</h3>
    </div>
  </div>
  <div className="info-side">

  <div className="icon">
  <span className={icon}></span>
    </div>

    <div className="location-container">
      <input placeholder='Search location...' className="location-button"  onChange={change}/>
      <span onClick={search} className="mdi mdi-magnify"></span>
    </div>


    <div className="today-info-container">
      <div className="today-info">
        <div className="precipitation"> <span className="title">TEMPRETURE</span> <span className="value">{tempreture}°C</span>
          <div className="clear"></div>
        </div>
        <div className="humidity"> <span className="title">HUMIDITY</span><span className="value">{humidity} %</span>
          <div className="clear"></div>
        </div>
        <div className="wind"> <span className="title">WIND</span><span className="value">{wind} km/h</span>
          <div className="clear"></div>
        </div>
        <div className="visibility"> <span className="title">Visibility</span> <span className="value">{visibility}</span>
          <div className="clear"></div>
        </div>
      </div>
    </div>
    
  
  </div>
</div>
    </>
  )
}

export default App