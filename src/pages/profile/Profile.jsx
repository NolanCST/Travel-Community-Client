import { useEffect, useState } from "react";
import Navbar from "../../components/layouts/NavBar";
import { Link } from "react-router-dom";
import "./profile.css";

function Profile() {
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("@token");
  const [travels, setTravels] = useState([]);

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
            <Link className="travel-item" key={index} to={`/details/${element.id}`} state={element.id} style={{ textDecoration: "none" }}>
              <p>{element.title}</p>
              <p>{element.country}</p>
              <p>Jours: {element.days}</p>
              <img src={element.image} alt={element.alt} />
            </Link>
            <Link to={`/edit/${element.id}`} state={element.id} style={{ textDecoration: "none" }}>
              <button className="edit-button" type="button">
                Modifier
              </button>
            </Link>
            <button className="delete-button" onClick={handleDelete}>
              Supprimer
            </button>
          </>
        );
      }
    });
  };

  useEffect(() => {
    getUser();
    getTravels();
  }, []);

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer votre voyage ?");
    if (isConfirmed) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/travels/${travels[0].id}`, { method: "DELETE" });

        const data = await response.json();
        console.log(data);
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
      <div className="profileContainer">
        <label className="profilLabel" htmlFor="lastname">
          Nom :
          <input className="profilInput" id="lastname" defaultValue={user.lastname} />
        </label>
        <label className="profilLabel" htmlFor="firstname">
          Prénom :
          <input className="profilInput" id="firstname" defaultValue={user.firstname} />
        </label>
        <label className="profilLabel" htmlFor="pseudo">
          Pseudo :
          <input className="profilInput" id="pseudo" defaultValue={user.pseudo} />
        </label>
        <label className="profilLabel" htmlFor="email">
          Email :
          <input className="profilInput" id="email" defaultValue={user.email} />
        </label>
        <label className="profilLabel">
          Pays :<p className="profilInput">{user.country}</p>
        </label>
      </div>
      <div className="travel-list">{renderTravels()}</div>
    </>
  );
}

export default Profile;
