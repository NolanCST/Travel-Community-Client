import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layouts/NavBar";

function Login() {
   const [loginInput, setLogin] = useState({
      email: "",
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
            email: loginInput.email,
            password: loginInput.password,
         }),
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, options);

      const data = await response.json();

      if (data.status === 200) {
         localStorage.setItem("@token", data.token);
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
         <nav>
            <Navbar />
         </nav>
         <form onSubmit={loginSubmit}>
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" name="email" value={loginInput.email} onChange={handleInput} required />
            <span>{loginInput.error_list.email}</span>
            <label htmlFor="password">Mot de passe:</label>
            <input id="password" type="password" name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+]).{12,}" value={loginInput.password} onChange={handleInput} required />
            <span>{loginInput.error_list.password}</span>
            <input type="submit" />
         </form>
      </>
   );
}

export default Login;
