import { useState } from "react";
import Country from "../../components/api/Country";
import { useStatus } from "../../components/status/Status";
import { useNavigate } from "react-router-dom";

function CreateTravel() {
   const { idUser } = useStatus();
   const [formData, setFormData] = useState({
      title: "",
      description: "",
      image: {},
      days: "",
      country: "",
   });
   const [country, setCountry] = useState("");
   const [travelDays, setTravelDays] = useState([]);

   const [titleDay, setTitleDay] = useState([]);
   const [descriptionDay, setDescriptionDay] = useState([]);
   const [imageDay, setImageDay] = useState([]);

   const navigate = useNavigate();

   const handleCountryChange = (selectedCountry) => {
      setCountry(selectedCountry);
      setFormData({ ...formData, country: selectedCountry });
   };

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleFile = (e) => {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
   };

   const handleTitleDayChange = (index, value) => {
      const updatedDays = [...travelDays];

      if (!updatedDays[index]) {
         updatedDays[index] = {};
      }

      updatedDays[index].titleDay = value;
      setTravelDays(updatedDays);
   };

   const handleDescriptionDayChange = (index, value) => {
      const updatedDays = [...travelDays];

      if (!updatedDays[index]) {
         updatedDays[index] = {};
      }

      updatedDays[index].descriptionDay = value;
      setTravelDays(updatedDays);
   };

   const renderTravelDay = () => {
      const travelDayElements = [];
      for (let i = 0; i < formData.days; i++) {
         travelDayElements.push(
            <div key={i}>
               <label htmlFor={`title_day_${i}`}>Titre du jour</label>
               <input type="text" id={`title_day_${i}`} name={`title_day_${i}`} max="50" defaultValue={travelDays[i]?.titleDay || ""} onChange={(e) => handleTitleDayChange(i, e.target.value)} />
               <label htmlFor={`description_day_${i}`}>Description du jour</label>
               <textarea name={`description_day_${i}`} id={`description_day_${i}`} cols="30" rows="10" defaultValue={travelDays[i]?.descriptionDay || ""} onChange={(e) => handleDescriptionDayChange(i, e.target.value)}></textarea>
               <label htmlFor="image_day">Images du jour</label>
               <input type="file" id="image_day" name="image_day" onChange={(e) => setImageDay(e.target.value)} />
            </div>
         );
      }
      return travelDayElements;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image", formData.image);
      formDataToSend.append("days", formData.days);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("user_id", idUser);
      console.log(travelDays);
      formDataToSend.append("travelDays", JSON.stringify(travelDays));

      try {
         let options = {
            method: "POST",
            body: formDataToSend,
         };

         await fetch(`${import.meta.env.VITE_API_URL}/travels`, options)
            .then((response) => {
               if (response.ok) {
                  console.log(response);
                  // navigate("/profile");
               } else {
                  throw new Error(`Erreur lors de la requête : ${response.status}`);
               }
            })
            .catch((error) => console.error("Erreur lors de la requête :", error));
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <label htmlFor="title">Titre</label>
            <input type="text" id="title" name="title" max="50" onChange={handleChange} required />
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" cols="30" rows="10" onChange={handleChange} required></textarea>
            <label htmlFor="image">Image</label>
            <input type="file" id="image" name="image" onChange={handleFile} />
            <label htmlFor="days">Nombre de jours</label>
            <input type="number" id="days" name="days" onChange={handleChange} required />
            <label htmlFor="country">Destination</label>
            <Country selectedCountry={country} onCountryChange={handleCountryChange} />
            {renderTravelDay()}
            <input type="submit" />
         </form>
      </>
   );
}

export default CreateTravel;
