import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("@token");
  async function getUser() {
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
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <p>{user.lastname}</p>
      <p>{user.firstname}</p>
      <p>{user.pseudo}</p>
      <p>{user.email}</p>
      <p>{user.country}</p>
    </div>
  );
}

export default Profile;
