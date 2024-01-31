import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function DetailsTravel() {
  const travelId = useLocation().state;
  const [travel, setTravel] = useState([]);
  const [travelDays, setTravelDays] = useState([]);
  const [dayImages, setDayImages] = useState([]);
  const [legislation, setLegislation] = useState([]);

  const getTravel = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/travels/${travelId}`);

      const data = await response.json();
      setTravel(data.travel);
      setTravelDays(data.travelDays);
      setDayImages(data.dayImages);
      setLegislation(data.travel[0].legislations);
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
    return travelDays?.map((dayElement, index) => {
      // Trouver le tableau d'images correspondant au jour actuel
      const imagesForDay = dayImages[index];

      // Vérifier s'il y a des images pour ce jour
      if (imagesForDay && imagesForDay.length > 0) {
        return (
          <div key={index}>
            <p>{dayElement.title_day}</p>
            <p>{dayElement.description_day}</p>
            {imagesForDay.map((imageElement, imageIndex) => (
              <div key={imageIndex}>
                <img src={imageElement.image} alt={imageElement.alt} />
              </div>
            ))}
          </div>
        );
      } else {
        // Retourner null si aucune correspondance trouvée
        return null;
      }
    });
  };

  const renderLegislation = () => {
    return legislation?.map((element, index) => (
      <div key={index}>
        <p>{element.country}</p>
        <p>{element.rules}</p>
      </div>
    ));
  };

  return (
    <div>
      {renderTravel()}
      {renderTravelDays()}
      {renderLegislation()}
    </div>
  );
}

export default DetailsTravel;
