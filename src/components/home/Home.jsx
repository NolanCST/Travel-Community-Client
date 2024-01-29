import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
   const [travels, setTravels] = useState([]);
   const getTravels = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/travels`);

      const data = await response.json();

      setTravels(data.travels);
   };

   useEffect(() => {
      getTravels();
   }, []);

   const renderTravels = () => {
      return travels?.map((element, index) => (
         <Link key={index} to={`/details/${element.id}`} state={element.id} style={{ textDecoration: "none" }}>
            <div>
               <p>{element.title}</p>
               <p>{element.country}</p>
               <p>Jours: {element.days}</p>
               <img src={element.image} alt="image" />
            </div>
         </Link>
      ));
   };

   return <div>{renderTravels()}</div>;
}

export default Home;
