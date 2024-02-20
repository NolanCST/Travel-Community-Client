import { useEffect, useState } from "react";
import Country from "../../components/api/Country";
import Navbar from "../../components/layouts/NavBar";
import { useLocation, useNavigate } from "react-router-dom";

function EditTravel() {
  const token = localStorage.getItem("@token");
  const travelId = useLocation().state;
  const [travel, setTravel] = useState([]);
  const [newImageTravel, setNewImageTravel] = useState("");
  const [travelDays, setTravelDays] = useState([]);
  const [dayImages, setDayImages] = useState([]);
  const [country, setCountry] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: {},
    days: "",
    country: "",
  });
  const navigate = useNavigate();

  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
    setFormData({ ...formData, country: selectedCountry });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setNewImageTravel(window.URL.createObjectURL(e.target.files[0]));
  };

  const getTravel = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/travels/${travelId}`);

      const data = await response.json();
      const travelData = data.travel[0];

      setFormData({
        title: travelData.title,
        description: travelData.description,
        days: travelData.days,
        country: travelData.country,
      });

      setTravel(travelData);
      setTravelDays(data.travelDays);
      setDayImages(data.dayImages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTravel();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("days", formData.days);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("_method", "PUT");

    try {
      let options = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formDataToSend,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/travels/${travelId}`, options);
      console.log(response);
      if (response.ok) {
        navigate("/profile");
      } else {
        throw new Error(`Erreur lors de la requête : ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   const renderTravelDays = () => {
  //     return travelDays?.map((element, index) => {
  //       const imagesForDay = dayImages[index];
  //       return (
  //         <div key={index}>
  //           <label htmlFor={""}>Titre du jour</label>
  //           <input type="text" id={""} name={""} max="50" defaultValue={element.title_day} onChange={(e) => handleTitleDayChange(i, e.target.value)} />
  //           <label htmlFor={""}>Description du jour</label>
  //           <textarea name={""} id={""} cols="30" rows="10" defaultValue={element.description_day} onChange={(e) => handleDescriptionDayChange(i, e.target.value)}></textarea>
  //           <label htmlFor={""}>Images du jour</label>
  //           <input type="file" id={""} name={""} onChange={(e) => handleImageDayChange(i, e)} />
  //           {imagesForDay.map((imageElement, imageIndex) => {
  //             return (
  //               <div key={imageIndex}>
  //                 <img src={imageElement.image} alt={imageElement.alt} />
  //               </div>
  //             );
  //           })}
  //         </div>
  //       );
  //     });
  //   };

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <label htmlFor="title">Titre</label>
        <input type="text" id="title" name="title" max="50" defaultValue={travel.title} onChange={handleChange} required />
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" cols="30" rows="10" defaultValue={travel.description} onChange={handleChange} required></textarea>
        <label htmlFor="image">Image</label>
        <input type="file" id="image" name="image" onChange={handleFileChange} />
        <label htmlFor="days">Nombre de jours</label>
        <input type="number" id="days" name="days" defaultValue={travel.days} onChange={handleChange} required />
        <label htmlFor="country">Destination</label>
        <Country country={travel.country} selectedCountry={country} onCountryChange={handleCountryChange} />
        <label htmlFor="imageTravel"></label>
        <img id="imageTravel" src={newImageTravel ? newImageTravel : travel.image} alt={travel.alt} />
        {/* {renderTravelDays()} */}
        <input type="submit" />
      </form>
    </>
  );
}

export default EditTravel;
