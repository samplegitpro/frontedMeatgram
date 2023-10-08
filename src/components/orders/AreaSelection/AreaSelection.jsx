import React,{useState,useRef} from "react";

function AreaSelection({ setSelectedCityStore }){
    const [selectedCity, setSelectedCityLocal] = useState("Bhopal");
    const cities = [
        "Arera Colony",
        "Bairagarh",
        "Berasia Road",
        "Bittan Market",
        "GovindPura",
        "Habibganj",
        "Hamidia Road",
        "Hoshangabad Road",
        "Indrapuri",
        "Jahangirabad",
        "Koh-e-Pizza",
        "Kolar Road",
        "Malviya Nagar",
        "Marvari Road",
        "MP Nagar",
        "Peergate",
        "Raisen Road",
        "Shahpura",
        "Shivaji Nagar",
        "Sultania Road"
      ];
    
      const selectRef = useRef(null);
    
      const handleCityClick = () => {
        // Trigger click event on the hidden select element
        selectRef.current.click();
      };
    
      const handleCityChange = (city) => {
        setSelectedCityLocal(city); 
        setSelectedCityStore(city);
        
      };
    
    return (
            <div className="title d-inline" onClick={handleCityClick}>
               
               <select
                 ref={selectRef}
                 className="form-select"
                 onChange={(e) => handleCityChange(e.target.value)}
                 value={selectedCity}
               >
                 {cities.map((city) => (
                   <option key={city} value={city}>
                     {city}
                   </option>
                 ))}
               </select>
                </div>
    );

}

export default AreaSelection;