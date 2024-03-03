import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/layouts/NavBar";
import Footer from "../../components/layouts/Footer";
import "./detailsTravel.css";

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
         <div className="detailsPart1" key={index}>
            <p className="detailsTitle">{element.title}</p>
            <p className="detailsCountry">{element.legislations[0].country}</p>
            <p className="detailsNumberDays">Jours: {element.days}</p>
            <img className="imgTravel" src={element.image} alt={element.alt} />
         </div>
      ));
   };

   const renderTravelDays = () => {
      return travelDays?.map((dayElement, index) => {
         const imagesForDay = dayImages[index];

         if (imagesForDay && imagesForDay.length > 0) {
            return (
               <div className="detailsPart2" key={index}>
                  <p className="detailsDayTitle">
                     Jour {index + 1} : {dayElement.title_day}
                  </p>
                  <p className="detailsDayDesc">{dayElement.description_day}</p>
                  {imagesForDay.map((imageElement, imageIndex) => (
                     <div key={imageIndex}>
                        <img src={imageElement.image} alt={imageElement.alt} />
                     </div>
                  ))}
               </div>
            );
         } else {
            return null;
         }
      });
   };

   const renderLegislation = () => {
      return legislation?.map((element, index) => (
         <div className="legislationTravel" key={index}>
            <p className="legislationTitle">Renseignements important concernant le {element.country}</p>
            <p className="legislationDesc">{element.rules}</p>
         </div>
      ));
   };

   return (
      <>
         <nav>
            <Navbar />
         </nav>
         <div className="detailsTravel">
            {renderTravel()}
            {renderTravelDays()}
            {renderLegislation()}
         </div>
         <footer>
            <Footer />
         </footer>
      </>
   );
}

export default DetailsTravel;
