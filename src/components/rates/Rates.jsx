import { useState } from "react";
import { useStatus } from "../status/Status";
import "./rates.css";

function Rates(props) {
  const { idUser } = useStatus();
  const [review, setReview] = useState("");
  const [rate, setRate] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [newRate, setNewRate] = useState("");
  const [editMode, setEditMode] = useState(-1);
  const token = localStorage.getItem("@token");

  const renderRates = () => {
    return props.rates?.map((element, index) => {
      const rateId = element.id;
      const stars = [];
      let renderImgRate = "";

      for (let i = 0; i < element.rate; i++) {
        stars.push(<span key={i}>⭐</span>);
      }
      if (element.image != null) {
        renderImgRate = element.image;
      }

      return (
        <div className="renderRateDetailsPlace" key={index}>
          {editMode === rateId ? (
            // Formulaire d'édition
            <form encType="multipart/form-data" onSubmit={(e) => editRate(e, rateId)}>
              <p>Votre note</p>
              <input type="number" min="1" max="5" defaultValue={element.rate} onChange={(e) => setNewRate(e.target.value)} required />
              <p>Votre commentaire</p>
              <textarea defaultValue={element.review} onChange={(e) => setNewReview(e.target.value)}></textarea>
              <button type="submit">Enregistrer</button>
            </form>
          ) : (
            // Contenu de l'avis
            <div>
              <div className="renderStarRate">{stars}</div>
              <img className="renderImgRate" src={renderImgRate} />
              <p>{element.review}</p>
            </div>
          )}
          {element.user_id === idUser ? (
            <div className="rateBtns">
              <button className="btnEditRate" onClick={() => enterEditMode(rateId, element.rate, element.review)}>
                ✏️
              </button>
              <button className="btnDeleteRate" onClick={() => deleteRate(rateId)}>
                🗑️
              </button>
            </div>
          ) : null}
        </div>
      );
    });
  };

  const createRate = async (e) => {
    const travel = props.travel;
    e.preventDefault();
    if (token) {
      let formData = new FormData();
      formData.append("review", review);
      formData.append("rate", rate);
      formData.append("travel_id", travel[0].id);

      try {
        let options = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/rates`, options);
        const data = await response.json();
        console.log(data);
        if (data) {
          alert(data.message);
          window.location.reload();
        } else {
          alert("Erreur dans la publication de votre avis");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Vous devez être connecté en tant que membre pour mettre un commentaire");
    }
  };

  const enterEditMode = (rateId, oldRate, oldReview) => {
    if (editMode !== -1) {
      setEditMode(-1);
    } else {
      setEditMode(rateId);
      setNewReview(oldReview);
      setNewRate(oldRate);
    }
  };

  const editRate = async (e, rateId) => {
    e.preventDefault();

    let options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        review: newReview,
        rate: newRate,
      }),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rates/${rateId}`, options);
      const data = await response.json();
      if (data.success) {
        alert("Votre avis a bien été modifié");
        window.location.reload();
      }
    } catch (error) {
      console.error("Erreur dans la modification de votre avis", error);
    }
    setEditMode(-1);
  };

  const deleteRate = async (rateId) => {
    try {
      let options = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rates/${rateId}`, options);
      const data = await response.json();
      console.log(data);
      if (data) {
        alert(data.message);
        window.location.reload();
      }
    } catch (error) {
      console.error("Erreur dans la suppression de votre avis", error);
    }
  };

  return (
    <>
      <section>
        <div id="review">
          <div className="span1">
            <h2 className="titleComment">Donnez nous votre avis !</h2>
            <form className="form-horizontal" id="ratingForm" encType="multipart/form-data" onSubmit={createRate} name="ratingForm">
              <div className="form-group">
                <label className="formText">Votre note</label>
                <div className="rate">
                  <input type="radio" id="star5" name="rate" value="5" onChange={(e) => setRate(e.target.value)} />
                  <label htmlFor="star5" title="5">
                    5 stars
                  </label>
                  <input type="radio" id="star4" name="rate" value="4" onChange={(e) => setRate(e.target.value)} />
                  <label htmlFor="star4" title="4">
                    4 stars
                  </label>
                  <input type="radio" id="star3" name="rate" value="3" onChange={(e) => setRate(e.target.value)} />
                  <label htmlFor="star3" title="3">
                    3 stars
                  </label>
                  <input type="radio" id="star2" name="rate" value="2" onChange={(e) => setRate(e.target.value)} />
                  <label htmlFor="star2" title="2">
                    2 stars
                  </label>
                  <input type="radio" id="star1" name="rate" value="1" onChange={(e) => setRate(e.target.value)} />
                  <label htmlFor="star1" title="1">
                    1 star
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label className="formText">Votre commentaire</label>
                <textarea className="commentArea" name="review" onChange={(e) => setReview(e.target.value)}></textarea>
              </div>
              <div className="form-group">
                <input className="btnComment" type="submit" value="Envoyer" />
              </div>
            </form>
          </div>
          <div className="span2">
            <h2 className="titleComment">Commentaires</h2>
            <div>{renderRates()}</div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Rates;
