import { useEffect, useState } from "react";
import Navbar from "../../components/layouts/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import "./editTravel.css";

function EditTravel() {
  const token = localStorage.getItem("@token");
  const travelId = useLocation().state;
  const [travel, setTravel] = useState([]);
  const [newImageTravel, setNewImageTravel] = useState("");
  const [travelDays, setTravelDays] = useState([]);
  const [dayImages, setDayImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: {},
  });
  const navigate = useNavigate();

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

  const handleImageDayChange = (id, e) => {
    const file = e.target.files[0];

    const updatedDays = travelDays.map((element) => {
      if (element.id === id) {
        if (!element.images || !element.images.some((img) => img.name === file.name)) {
          element.images = [...(element.images || []), file];
        }
      }
      return element;
    });
    setTravelDays(updatedDays);

    e.target.value = null;
  };

  const handleDeleteImage = (dayIndex, imageIndex) => {
    setTravelDays((prevDays) => {
      const updatedDays = [...prevDays];
      updatedDays[dayIndex].images.splice(imageIndex, 1);
      return updatedDays;
    });
  };

  const renderTravelDays = () => {
    return travelDays?.map((element, index) => {
      const imagesForDay = dayImages[index];
      return (
        <div key={index} className="travelForm2">
          <label className="travelFormLabel" htmlFor={`title_day_${element.id}`}>
            Titre du jour
          </label>
          <input className="travelFormInput" type="text" id={`title_day_${element.id}`} name={`title_day_${element.id}`} max="50" defaultValue={element.title_day} onChange={(e) => handleTitleDayChange(element.id, e.target.value)} />
          <label className="travelFormLabel" htmlFor={`description_day_${element.id}`}>
            Description du jour
          </label>
          <textarea
            className="travelFormArea"
            name={`description_day_${element.id}`}
            id={`description_day_${element.id}`}
            cols="30"
            rows="10"
            defaultValue={element.description_day}
            onChange={(e) => handleDescriptionDayChange(element.id, e.target.value)}
          ></textarea>
          <label className="travelFormLabel" htmlFor={`image_day_${element.id}`}>
            Images du jour
          </label>
          <input type="file" id={`image_day_${element.id}`} name={`image_day_${element.id}`} onChange={(e) => handleImageDayChange(element.id, e)} />
          <div className="imagesForDay">
            {imagesForDay?.map((imageElement, imageIndex) => {
              return (
                <div key={imageIndex} className="imageForDay">
                  <img className="imageDay" src={imageElement.image} alt={imageElement.alt} />
                  <button
                    onClick={() => {
                      handleDeleteImgDay(imageElement.id);
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              );
            })}
          </div>
          {element.images && (
            <div>
              <strong>Images ajoutées :</strong>
              {element.images.map((image, index) => (
                <div key={index}>
                  {image.name}
                  <button type="button" onClick={() => handleDeleteImage(element.id, index)}>
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    });
  };

  const handleDeleteImgDay = async (id) => {
    try {
      let options = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/imgDay/${id}`, options);

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    travelDays.map((element, idx) => {
      formDataToSend.append(`travelDays[${idx}][id]`, element.id);
      formDataToSend.append(`travelDays[${idx}][title_day]`, element.title_day);
      formDataToSend.append(`travelDays[${idx}][description_day]`, element.description_day);
      element.images?.map((img) => {
        formDataToSend.append(`travelDays[${idx}][images][]`, img);
      });
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

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
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
      <div className="createHeader">
        <h1 className="headerTitle">Modifier un voyage</h1>
      </div>
      <form className="travelForm" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="travelForm1">
          <label className="travelFormLabel" htmlFor="title">
            Titre
          </label>
          <input className="travelFormInput" type="text" id="title" name="title" max="50" defaultValue={travel.title} onChange={handleChange} required />
          <label className="travelFormLabel" htmlFor="description">
            Description
          </label>
          <textarea className="travelFormArea" name="description" id="description" cols="30" rows="10" defaultValue={travel.description} onChange={handleChange} required></textarea>
          <label className="travelFormLabel" htmlFor="image">
            Image
          </label>
          <input type="file" id="image" name="image" onChange={handleFileChange} />
          <p className="travelFormLabel">Nombre de jours: {travel.days}</p>
          <p className="travelFormLabel">Destination: {travel.legislations?.[0]?.country}</p>
          <label className="travelFormLabel" htmlFor="imageTravel"></label>
          <img id="imageTravel" src={newImageTravel ? newImageTravel : travel.image} alt={travel.alt} />
        </div>
        {renderTravelDays()}
        <div className="travelFormSubmit">
          <input className="submitBtn" type="submit" />
        </div>
      </form>
    </>
  );
}

export default EditTravel;
