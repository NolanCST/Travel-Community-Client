import { useEffect, useState } from "react";
import "./country.css";

function Country({ selectedCountry, onCountryChange, country }) {
  const [listCountries, setListCountries] = useState([]);
  const getListCountries = async () => {
    try {
      const response = await fetch("https://api.thecompaniesapi.com/v1/locations/countries");
      const data = await response.json();
      setListCountries(data.countries);
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  useEffect(() => {
    getListCountries();
  }, []);

  const renderListCountries = () => {
    return listCountries?.map((element, index) => {
      const id = index + 1;
      return (
        <option key={element.code} value={id}>
          {element.nameFr}
        </option>
      );
    });
  };

  return (
    <>
      <select id="country" type="text" name="country" max="50" defaultValue={country ?? selectedCountry} onChange={(e) => onCountryChange(e.target.value)} required>
        <option value="">Choisissez votre pays</option>
        {renderListCountries()}
      </select>
    </>
  );
}

export default Country;
