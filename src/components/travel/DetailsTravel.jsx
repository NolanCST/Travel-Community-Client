import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function DetailsTravel() {
  const travelId = useLocation().state;
  const [travel, setTravel] = useState([]);

  const getTravel = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/travels/${travelId}`);

      const data = await response.json();
      setTravel(data.travel);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTravel();
  }, []);

  const renderTravel = () => {
    return travel?.map((element, index) => (
      <div key={index}>
        <p>{element.title}</p>
        <p>{element.country}</p>
        <p>Jours: {element.days}</p>
        <img src={element.image} alt="image" />
      </div>
    ));
  };

  return <div>{renderTravel()}</div>;
}

export default DetailsTravel;
