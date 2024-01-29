import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function DetailsTravel() {
  const travelId = useLocation().state;
  const [travel, setTravel] = useState([]);
  const [travelDays, setTravelDays] = useState([]);
  const [dayImages, setDayImages] = useState([]);

  const getTravel = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/travels/${travelId}`);

      const data = await response.json();
      setTravel(data.travel);
      setTravelDays(data.travelDays);
      setDayImages(data.dayImages);
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

  const renderTravelDays = () => {
    console.log(travelDays);
    console.log(dayImages[0]);

    return travelDays?.map((dayElement, index) => {
      if (dayImages[0] === dayElement.id) {
        return dayImages?.map((imageElement) => (
          <div key={index}>
            <p>{dayElement.title_day}</p>
            <p>{dayElement.description_day}</p>
            <img src={imageElement.image} alt={imageElement.alt} />
          </div>
        ));
      }
      return null; // Ajout d'un retour null pour les jours sans correspondance
    });
  };

  return (
    <div>
      {renderTravel()}
      {renderTravelDays()}
    </div>
  );
}

export default DetailsTravel;
