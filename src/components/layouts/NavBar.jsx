import { useStatus } from "../status/Status";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { useEffect, useState } from "react";

function Navbar() {
  const { status } = useStatus();
  const token = localStorage.getItem("@token");
  const navigate = useNavigate();
  const [online, setOnline] = useState(false);

  const handleOnline = () => {
    if (status === 0 || status === 1) {
      setOnline(true);
    } else {
      setOnline(false);
    }
  };

  useEffect(() => {
    handleOnline();
  });

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

        const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, options);
        console.log(response);

        if (response.ok) {
          localStorage.removeItem("@token");
          navigate("/login");
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
          <div>
            <li>
              <a href="/">Accueil</a>
            </li>
            <li>
              <a href="#">Découvir</a>
            </li>
            {online ? (
              <>
                <li>
                  <a href="/create">Partager un voyage</a>
                </li>
                <li>
                  <a href="#">Profil</a>
                </li>
              </>
            ) : null}

            <li>
              <a href="#">contact</a>
            </li>
          </div>
          {online ? (
            <li>
              <a href="#" onClick={handleLogout}>
                Se déconnecter
              </a>
            </li>
          ) : (
            <div>
              <li>
                <a href="#">S'inscrire</a>
              </li>
              <li>
                <a href="#">Se connecter</a>
              </li>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
