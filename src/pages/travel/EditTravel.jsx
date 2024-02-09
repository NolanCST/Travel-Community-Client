import { useEffect, useState } from "react";
import Country from "../../components/api/Country";
import Navbar from "../../components/layouts/NavBar";
import { useStatus } from "../../components/status/Status";
import { useLocation } from "react-router-dom";

function EditTravel() {
   const { idUser } = useStatus();
   const travelId = useLocation().state;
   const [travel, setTravel] = useState([]);
   const [travelDays, setTravelDays] = useState([]);
   const [dayImages, setDayImages] = useState([]);
   const [country, setCountry] = useState("");

   const handleCountryChange = (selectedCountry) => {
      setCountry(selectedCountry);
      setFormData({ ...formData, country: selectedCountry });
   };

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
      return travel?.map((element, index) => {
         return (
            <>
               <div key={index}>
                  <label htmlFor="title">Titre</label>
                  <input type="text" id="title" name="title" max="50" defaultValue={element.title} required />
                  <label htmlFor="description">Description</label>
                  <textarea name="description" id="description" cols="30" rows="10" defaultValue={element.description} required></textarea>
                  <label htmlFor="image">Image</label>
                  <input type="file" id="image" name="image" />
                  <label htmlFor="days">Nombre de jours</label>
                  <input type="number" id="days" name="days" defaultValue={element.days} required />
                  <label htmlFor="country">Destination</label>
                  <Country country={element.country} selectedCountry={country} onCountryChange={handleCountryChange} />
               </div>
            </>
         );
      });
   };

   const renderTravelDays = () => {
      return travelDays?.map((element, index) => {
         const imagesForDay = dayImages[index];
         return (
            <div key={index}>
               <label htmlFor={""}>Titre du jour</label>
               <input type="text" id={""} name={""} max="50" defaultValue={element.title_day} onChange={(e) => handleTitleDayChange(i, e.target.value)} />
               <label htmlFor={""}>Description du jour</label>
               <textarea name={""} id={""} cols="30" rows="10" defaultValue={element.description_day} onChange={(e) => handleDescriptionDayChange(i, e.target.value)}></textarea>
               <label htmlFor={""}>Images du jour</label>
               <input type="file" id={""} name={""} onChange={(e) => handleImageDayChange(i, e)} />
               {imagesForDay.map((imageElement, imageIndex) => {
                  return (
                     <div key={imageIndex}>
                        <img src={imageElement.image} alt={imageElement.alt} />
                     </div>
                  );
               })}
            </div>
         );
      });
   };

   return (
      <>
         <nav>
            <Navbar />
         </nav>
         <form encType="multipart/form-data">
            {renderTravel()}
            {renderTravelDays()}
            <input type="submit" />
         </form>
      </>
   );
}

export default EditTravel;
