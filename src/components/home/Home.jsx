import { useEffect } from "react";

function Home() {
  const getTravels = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/travels`);

    const data = await response.json();

    console.log(data);
  };

  useEffect(() => {
    getTravels();
  });
}

export default Home;
