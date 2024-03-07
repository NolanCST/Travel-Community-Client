import React, { createContext, useContext, useState, useEffect } from "react";

const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
  const [status, setStatus] = useState(null);
  const [idUser, setIdUser] = useState(null);

  async function getUserStatus() {
    try {
      const token = localStorage.getItem("@token");
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
          setStatus(data.status);
          setIdUser(data.id);
        } else {
          console.error("Erreur dans la récupération du status de l'utilisateur");
        }
      } else {
        console.error("Token non trouvé");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  }

  const clear = () => {
    setStatus(null);
    setIdUser(null);
  };

  useEffect(() => {
    getUserStatus();
  }, []);

  return <StatusContext.Provider value={{ status, setStatus, idUser, setIdUser, refresh: getUserStatus, clear }}>{children}</StatusContext.Provider>;
};

export const useStatus = () => {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error("useStatus doit être utilisé dans un StatusProvider");
  }
  return context;
};
