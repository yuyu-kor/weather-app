import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, setCity, handleCurrentLocation, selectedCity }) => {
    
    return (
        <div className='button-container'>
            <Button variant="outline-light" 
            onClick={handleCurrentLocation} 
            className={selectedCity === "current" ? "selected-btn" : ""}>CurrentLocation</Button>
            
            {cities.map((item)=>(
                <Button 
                    variant="outline-light"
                    onClick={()=>setCity(item)}
                    className={selectedCity === item ? "selected-btn" : ""}
                >
                    {item}
                </Button>
            ))}
        </div>
    )
}

export default WeatherButton