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
      <div>
         {/* Menu Hamburger pour les petits écrans */}
         <div className="hamburgerMenu" onClick={toggleMenu}>
            <div className={isOpen ? "line line1 active" : "line line1"}></div>
            <div className={isOpen ? "line line2 active" : "line line2"}></div>
            <div className={isOpen ? "line line3 active" : "line line3"}></div>
         </div>
         <nav className={`navTag ${isOpen ? "open" : ""}`}>
            <a className="imageLink" href="/">
               {/* <img className="logoSmall" src={logo} /> */}
            </a>
            <div className="navbar">
               <ul className="navbarListLeft">
                  <li>
                     <a className="link" href="/">
                        Découvrir
                     </a>
                  </li>
                  {(status === 0 || status === 1) && (
                     <>
                        <li>
                           <a className="link" href="/create">
                              Ajouter
                           </a>
                        </li>
                        <li>
                           <a className="link" href="/profile">
                              Profil
                           </a>
                        </li>
                     </>
                  )}
               </ul>
               <ul className="navbarListRight">
                  {status === 0 || status === 1 ? (
                     <li>
                        <a className="link" onClick={handleLogout}>
                           Déconnexion
                        </a>
                     </li>
                  ) : (
                     <>
                        <li>
                           <a className="link" href="/register">
                              Inscription
                           </a>
                        </li>
                        <li>
                           <a className="link" href="/login">
                              Connexion
                           </a>
                        </li>
                     </>
                  )}
               </ul>
            </div>
         </nav>
      </div>
   );
}

export default Navbar;
