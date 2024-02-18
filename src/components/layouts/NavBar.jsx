import { useStatus } from "../status/Status";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { useState } from "react";
// import logo from "./Corgi_guge-removebg-preview.png";

function Navbar() {
  const { status } = useStatus();
  const token = localStorage.getItem("@token");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");

    if (isConfirmed) {
      try {
        let options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        };

        // Requête vers API pour révoquer le token
        const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, options);
        console.log(response);

        if (response.ok) {
          // Supprime les infos de connexion du localStorage
          localStorage.removeItem("@token");
          // Redirige l'utilisateur vers l'accueil
          navigate("/");
        } else {
          throw new Error(`Erreur lors de la requête : ${response.status}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div class="navbar">
      <div class="container nav-container">
        <input class="checkbox" type="checkbox" name="" id="" />
        <div class="hamburger-lines">
          <span class="line line1"></span>
          <span class="line line2"></span>
          <span class="line line3"></span>
        </div>
        <div class="menu-items">
          <li>
            <a href="#">Accueil</a>
          </li>
          <li>
            <a href="#">Découvir</a>
          </li>
          <li>
            <a href="#">Partager un voyage</a>
          </li>
          <li>
            <a href="#">Profil</a>
          </li>
          <li>
            <a href="#">contact</a>
          </li>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
