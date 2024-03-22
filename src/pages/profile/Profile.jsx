import { useEffect, useState } from "react";
import Navbar from "../../components/layouts/NavBar";
import { Link } from "react-router-dom";
import "./profile.css";

function Profile() {
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("@token");
  const [travels, setTravels] = useState([]);
  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    pseudo: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getUser = async () => {
    try {
      if (token) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setFormData({
            lastname: data.lastname,
            firstname: data.firstname,
            pseudo: data.pseudo,
            email: data.email,
          });
        } else {
          console.error("Erreur dans la récupération de l'utilisateur");
        }
      } else {
        console.error("Token non trouvé");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("lastname", formData.lastname);
    formDataToSend.append("firstname", formData.firstname);
    formDataToSend.append("pseudo", formData.pseudo);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("_method", "PUT");

    try {
      let options = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formDataToSend,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${user.id}`, options);

      if (response.ok) {
        alert("Votre profil a bien été modifié");
        window.location.reload();
      } else {
        throw new Error(`Erreur lors de la requête : ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTravels = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/travels`);

    const data = await response.json();

    setTravels(data.travels);
  };

  const renderTravels = () => {
    return travels?.map((element, index) => {
      if (element.user_id === user.id) {
        return (
          <>
            <div className="userTravels">
              <Link className="traCardProfile" key={index} to={`/details/${element.id}`} state={element.id} style={{ textDecoration: "none" }}>
                <img className="cardImage" src={element.image} alt="image" />
                <div className="cardInfos">
                  <h3 className="cardTitle">{element.title}</h3>
                  <p className="cardCountry">Pays: {element.legislations[0].country}</p>
                  <p className="cardDays">Nombre de jours: {element.days}</p>
                </div>
                <a className="homeBtn" href="#">
                  VOIR
                </a>
              </Link>
              <div className="userTravelsBtn">
                <Link to={`/edit/${element.id}`} state={element.id} style={{ textDecoration: "none" }}>
                  <button className="editButton" type="button">
                    Modifier
                  </button>
                </Link>
                <button
                  className="deleteButton"
                  onClick={() => {
                    handleDeleteTravel(element.id);
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </>
        );
      }
    });
  };

  useEffect(() => {
    getUser();
    getTravels();
  }, []);

  const handleDeleteTravel = async (id) => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer votre voyage ?");
    if (isConfirmed) {
      try {
        let options = {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        };
        const response = await fetch(`${import.meta.env.VITE_API_URL}/travels/${id}`, options);

        const data = await response.json();
        alert(data.message);
        getTravels();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteProfile = async () => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?");
    if (isConfirmed) {
      try {
        let options = {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        };
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${user.id}`, options);

        const data = await response.json();
        alert(data.message);
        localStorage.removeItem("@token");
        navigate("/register");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <div className="profileHeader">
        <h1 className="headerTitle">Profil</h1>
      </div>
      <form className="profileContainer" onSubmit={handleSubmit}>
        <div className="profilElements">
          <label className="profileLabel" htmlFor="lastname">
            Nom :
            <input className="profileInput" type="text" id="lastname" name="lastname" defaultValue={user.lastname} onChange={handleChange} />
          </label>
          <label className="profileLabel" htmlFor="firstname">
            Prénom :
            <input className="profileInput" type="text" id="firstname" name="firstname" defaultValue={user.firstname} onChange={handleChange} />
          </label>
        </div>
        <div className="profilElements">
          <label className="profileLabel" htmlFor="pseudo">
            Pseudo :
            <input className="profileInput" type="text" id="pseudo" name="pseudo" defaultValue={user.pseudo} onChange={handleChange} />
          </label>
          <label className="profileLabel">
            Pays :<p className="profileInput">{user.country}</p>
          </label>
        </div>
        <div className="profilEmail">
          <label className="profileLabel profileLabelEmail" htmlFor="email">
            Email :
            <input className="profileInput profileInputEmail" type="email" id="email" name="email" defaultValue={user.email} onChange={handleChange} />
          </label>
        </div>
        <div className="profilElements">
          <label className="profileLabel" htmlFor="password">
            Modifier le mot de passe :
            <input className="profileInput" type="password" id="password" name="password" onChange={handleChange} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+]).{12,}" />
          </label>
          <label className="profileLabel" htmlFor="confirm_password">
            Confirmer le mot de passe :
            <input className="profileInput" type="password" id="confirm_password" name="confirm_password" onChange={handleChange} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+]).{12,}" />
          </label>
        </div>
        <div className="profileFormSubmit">
          <input className="submitBtn" type="submit" />
        </div>
      </form>
      <div className="profiledelete">
        <button className="profileDeleteBtn" type="button" onClick={handleDeleteProfile}>
          Supprimer le compte
        </button>
      </div>
      <div className="travel-list">
        <div className="myTravels">
          <h1 className="myTravelsTitle">Mes voyages</h1>
        </div>
        {renderTravels()}
      </div>
    </>
  );
}

export default Profile;
