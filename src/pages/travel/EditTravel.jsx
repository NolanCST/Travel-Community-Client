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

  const handleTitleDayChange = (id, value) => {
    const updatedDays = travelDays.map((element) => {
      if (element.id === id) {
        return { ...element, title_day: value };
      }
      return element;
    });
    setTravelDays(updatedDays);
  };

  const handleDescriptionDayChange = (id, value) => {
    const updatedDays = travelDays.map((element) => {
      if (element.id === id) {
        return { ...element, description_day: value };
      }
      return element;
    });
    setTravelDays(updatedDays);
  };

  const renderTravelDays = () => {
    return travelDays?.map((element, index) => {
      const imagesForDay = dayImages[index];
      return (
        <div key={index}>
          <label htmlFor={`title_day_${element.id}`}>Titre du jour</label>
          <input type="text" id={`title_day_${element.id}`} name={`title_day_${element.id}`} max="50" defaultValue={element.title_day} onChange={(e) => handleTitleDayChange(element.id, e.target.value)} />
          <label htmlFor={`description_day_${element.id}`}>Description du jour</label>
          <textarea name={`description_day_${element.id}`} id={`description_day_${element.id}`} cols="30" rows="10" defaultValue={element.description_day} onChange={(e) => handleDescriptionDayChange(element.id, e.target.value)}></textarea>
          <label htmlFor={`image_day_${element.id}`}>Images du jour</label>
          <input type="file" id={`image_day_${element.id}`} name={`image_day_${element.id}`} onChange={(e) => handleImageDayChange(i, e)} />
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("days", formData.days);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("country", formData.country);
    travelDays.map((element, idx) => {
      console.log(element);
      formDataToSend.append(`travelDays[${idx}][id]`, element.id);
      formDataToSend.append(`travelDays[${idx}][title_day]`, element.title_day);
      formDataToSend.append(`travelDays[${idx}][description_day]`, element.description_day);
    });
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
        //   navigate("/profile");
      } else {
        throw new Error(`Erreur lors de la requête : ${response.status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        {renderTravelDays()}
        <input type="submit" />
      </form>
    </>
  );
}

export default EditTravel;
