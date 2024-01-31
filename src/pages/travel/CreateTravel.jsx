import { useState } from "react";
import Country from "../../components/api/Countries";

function CreateTravel() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: {},
    days: "",
    country: "",
  });
  const [country, setCountry] = useState([]);
  const [titleDay, setTitleDay] = useState([]);
  const [descriptionDay, setDescriptionDay] = useState([]);
  const [imageDay, setImageDay] = useState([]);

  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
    setFormData({ ...formData, country: country });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const renderTravelDay = () => {
    const travelDay = [];
    for (let i = 0; i < formData.days; i++) {
      travelDay.push(
        <div key={i}>
          <label htmlFor="title_day">Titre du jour</label>
          <input type="text" id="title_day" name="title_day" max="50" value={titleDay} onChange={(e) => setTitleDay(e.target.value)} />
          <label htmlFor="description_day">Description du jour</label>
          <textarea name="description_day" id="description_day" cols="30" rows="10" value={descriptionDay} onChange={(e) => setDescriptionDay(e.target.value)}></textarea>
          <label htmlFor="image_day">Images du jour</label>
          <input type="file" id="image_day" name="image_day" onChange={(e) => setImageDay(e.target.value)} />
        </div>
      );
    }
    return travelDay;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("days", formData.days);
    formDataToSend.append("country", formData.country);

    try {
      let options = {
        method: "POST",
        body: formDataToSend,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/travels`, options);

      const data = await response.json();

      console.log(data);
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
        <label>Destination</label>
        <Country selectedCountry={country} onCountryChange={handleCountryChange} />
        {renderTravelDay()}
        <input type="submit" />
      </form>
    </>
  );
}

export default CreateTravel;
