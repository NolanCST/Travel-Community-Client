import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
   const [loginInput, setLogin] = useState({
      pseudo: "",
      password: "",
      error_list: [],
   });
   const navigate = useNavigate();

   const handleInput = (e) => {
      e.preventDefault;
      setLogin({ ...loginInput, [e.target.name]: e.target.value });
   };

   const loginSubmit = async (e) => {
      e.preventDefault();

      let options = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            pseudo: loginInput.pseudo,
            password: loginInput.password,
         }),
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, options);

      const data = await response.json();
      console.log(data);
      if (data.status === 200) {
         localStorage.setItem("@token", data.token);
         localStorage.setItem("@pseudo", data.pseudo);
         alert(data.message);
         navigate("/");
      } else if (data.status === 401) {
         alert(data.message);
      } else {
         setLogin({ ...loginInput, error_list: data.validation_errors });
      }
   };

   return (
      <>
         <form onSubmit={loginSubmit}>
            <label htmlFor="pseudo">Pseudo:</label>
            <input id="pseudo" type="text" name="pseudo" value={loginInput.pseudo} onChange={handleInput} required />
            <span>{loginInput.error_list.pseudo}</span>
            <label htmlFor="password">Mot de passe:</label>
            <input id="password" type="password" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+]).{12,}" value={loginInput.password} onChange={handleInput} required />
            <span>{loginInput.error_list.password}</span>
            <input type="submit" />
         </form>
      </>
   );
}

export default Login;
