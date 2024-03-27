import "./popup.css";

function Popup({ setShowPopup }) {
   const closePopup = () => {
      setShowPopup(false);
   };

   return (
      <div className="popupContainer fixed top-0 w-full h-full bg-black/60 flex flex-col items-center justify-around z-[9999]">
         <button type="button" className="popupBtn w-full h-10 flex items-center justify-end mr-20" onClick={closePopup}>
            <img src="/images/icons8-effacer.svg" alt="icons croix" />
         </button>
         <div className="popupImgContainer w-4/5">
            <img className="popupImg" src="/images/photo_Terence.jpg" alt="photo de Terence" />
         </div>
      </div>
   );
}

export default Popup;
