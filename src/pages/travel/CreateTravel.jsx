import { useState } from "react";
import Country from "../../components/api/Country";
import { useStatus } from "../../components/status/Status";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layouts/NavBar";

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
      updatedDays[index] = {
        titleDay: value,
        descriptionDay: "",
        images: [],
      };
    } else {
      updatedDays[index].titleDay = value;
    }

    setTravelDays(updatedDays);
  };

  const handleDescriptionDayChange = (index, value) => {
    const updatedDays = [...travelDays];

    if (!updatedDays[index]) {
      updatedDays[index] = {
        titleDay: "",
        descriptionDay: value,
        images: [],
      };
    } else {
      updatedDays[index].descriptionDay = value;
    }

    setTravelDays(updatedDays);
  };

  const handleImageDayChange = (index, e) => {
    const file = e.target.files[0];
    setTravelDays((prevDays) => {
      const updatedDays = [...prevDays];
      if (!updatedDays[index]) {
        updatedDays[index] = {
          titleDay: "",
          descriptionDay: "",
          images: [file],
        };
      } else {
        if (!updatedDays[index].images || !updatedDays[index].images.includes(file)) {
          updatedDays[index].images = [...(updatedDays[index].images || []), file];
        }
      }

      return updatedDays;
    });

    e.target.value = null;
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
          <label htmlFor={`image_day_${i}`}>Images du jour</label>
          <input type="file" id={`image_day_${i}`} name={`image_day_${i}`} onChange={(e) => handleImageDayChange(i, e)} />
          {travelDays[i]?.images && (
            <div>
              <strong>Images ajoutées :</strong>
              {travelDays[i].images.map((image, index) => (
                <div key={index}>{image.name}</div>
              ))}
            </div>
          )}
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
    travelDays.map((element, idx) => {
      formDataToSend.append(`travelDays[${idx}][titleDay]`, element.titleDay);
      formDataToSend.append(`travelDays[${idx}][descriptionDay]`, element.titleDay);
      element.images.map((img, idx) => {
        formDataToSend.append(`travelDays[${idx}][images][]`, img);
      });
    });
    formDataToSend.append("user_id", idUser);

    try {
      let options = {
        method: "POST",
        body: formDataToSend,
      };

      await fetch(`${import.meta.env.VITE_API_URL}/travels`, options)
        .then((response) => {
          if (response.ok) {
            navigate("/profile");
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
      <nav>
        <Navbar />
      </nav>
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
