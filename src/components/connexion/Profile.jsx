import { useEffect, useState } from "react";

function Profile() {
  const token = localStorage.getItem("@token");
  const [user, setUser] = useState([]);

  const getProfile = async () => {
    try {
      let options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Autorization: "Bearer " + token,
        },
      };
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, options);

      console.log(response);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUser(data);
      } else {
        console.log("Erreur la récupération de l'utilisateur");
      }
    } catch {
      console.log("Erreur la récupération du fetch");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
}

export default Profile;
