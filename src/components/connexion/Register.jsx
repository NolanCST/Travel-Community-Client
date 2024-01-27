import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [listCountries, setListCountries] = useState([]);
  const navigate = useNavigate();

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
    return listCountries?.map((element) => (
      <option key={element.code} value={element.name}>
        {element.nameFr}
      </option>
    ));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        pseudo: pseudo,
        country: country,
        email: email,
        password: password,
      }),
    };

    await fetch(`${import.meta.env.VITE_API_URL}/register`, options)
      .then((response) => {
        if (response.ok) {
          navigate("/login");
        } else {
          throw new Error(`Erreur lors de la requête : ${response.status}`);
        }
      })
      .catch((error) => console.error("Erreur lors de la requête :", error));
  };

  return (
    <>
      <form action="" method="post">
        <label htmlFor="lastname">Nom:</label>
        <input id="lastname" type="text" name="lastname" max="50" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
        <label htmlFor="firstname">Prénom:</label>
        <input id="firstname" type="text" name="firstname" max="50" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
        <label htmlFor="pseudo">Pseudo:</label>
        <input id="pseudo" type="text" name="pseudo" max="30" value={pseudo} onChange={(e) => setPseudo(e.target.value)} required />
        <label htmlFor="country">Pays de résidence:</label>
        <select id="country" type="text" name="country" max="50" value={country} onChange={(e) => setCountry(e.target.value)} required>
          <option value="">Choisissez votre pays</option>
          {renderListCountries()}
        </select>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="password">Mot de passe:</label>
        <input id="password" type="password" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+]).{12,}" onChange={(e) => setPassword(e.target.value)} required />
        <p className="textPassword">*Au moins 12 caractères, un chiffre, une lettre majuscule, une minuscule et un caractère parmi !@#$%^&*_=+.</p>
        <input type="submit" onClick={handleRegister} />
      </form>
    </>
  );
}

export default Register;
