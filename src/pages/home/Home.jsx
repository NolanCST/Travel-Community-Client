import { useEffect, useState } from "react";
import { useStatus } from "../../components/status/Status";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/layouts/NavBar";
import "./home.css";
import Footer from "../../components/layouts/Footer";

function Home() {
  const { status } = useStatus();
  const [travels, setTravels] = useState([]);
  const navigate = useNavigate();

  const getTravels = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/travels`);

    const data = await response.json();

    setTravels(data.travels);
  };

  useEffect(() => {
    getTravels();
  }, []);

  const renderTravels = () => {
    return travels?.map((element, index) => (
      <Link className="traCard" key={index} to={`/details/${element.id}`} state={element.id} style={{ textDecoration: "none" }}>
        <img className="cardImage" src={element.image} alt="image" />
        <div className="cardInfos">
          <h3 className="cardTitle">{element.title}</h3>
          <p className="cardCountry">Pays: {element.legislations[0].country}</p>
          <p className="cardDays">Nombre de jours: {element.days}</p>
        </div>
        <a className="homeBtn" href="#">
          VOIR
        </a>
      </Link>
    ));
  };

  const goCreate = () => {
    if (status !== null) {
      navigate("/create");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <div className="welcome">
        <video className="welVideo" autoPlay loop muted>
          <source src="../../public/videos/fond-accueil.mp4" type="video/mp4" />
        </video>
        <div className="company">
          <img className="logo" src="../../public/images/logo.png" alt="logo" />
          <h1 className="name">Travel Community</h1>
        </div>
        <p className="welTitle">
          C'est l'heure de votre <strong>prochaine aventure</strong>
        </p>
        <a className="homeBtn" href="#">
          DÉCOUVRIR
        </a>
      </div>

      <div className="presentation">
        <div className="part1">
          <div className="part1-top">
            <img className="logo" src="../../public/images/logo.png" alt="logo" />
            <h1 className="preTitle">Voyager facilement</h1>
          </div>
          <p className="preDescription">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam optio deserunt porro in quo temporibus expedita velit, qui et deleniti iste laudantium sequi cupiditate nemo beatae, corporis maiores dicta. Commodi?
          </p>
          <div className="preBtn">
            <a className="homeBtn" href="#">
              TOUS LES VOYAGES
            </a>
            <button className="homeBtn" onClick={goCreate}>
              PARTAGER LE VOTRE
            </button>
          </div>
        </div>
        <img className="preImage" src="../../public/images/presentation.png" alt="voyageuse" />
      </div>

      <div className="travels">
        <h2 className="traTitle">Derniers Voyages</h2>
        <div className="renderTravel">{renderTravels()}</div>
      </div>

      <div className="advantages">
        <h2 className="advTitle">Le voyage parfait à porter de main</h2>
        <div className="advAllInfo">
          <div className="advInfo">
            <img className="infoImage" src="../../public/images/plane.png" alt="plane" />
            <h3 className="infoTitle">Transports</h3>
            <p className="infoDescription">Partagez vos astuces pour des déplacements fluides et offrez à d'autres la clé d'une aventure sans encombre.</p>
          </div>
          <div className="advInfo">
            <img className="infoImage" src="../../public/images/woman.png" alt="woman" />
            <h3 className="infoTitle">Visites & activités</h3>
            <p className="infoDescription">Proposez des idées captivantes pour permettre à d'autres de vivre des moments mémorables lors de leurs propres escapades.</p>
          </div>
          <div className="advInfo">
            <img className="infoImage" src="../../public/images/hotel.png" alt="hotel" />
            <h3 className="infoTitle">Hébergements</h3>
            <p className="infoDescription">Guidez la communauté vers des séjours inoubliables à travers vos recommandations personnelles.</p>
          </div>
        </div>
        <a className="homeBtn" href="#">
          DÉCOUVRIR
        </a>
      </div>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Home;
