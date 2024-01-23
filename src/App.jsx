import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/Home";
import CreateTravel from "./components/travel/CreateTravel";
import DetailsTravel from "./components/travel/DetailsTravel";
import EditTravel from "./components/travel/EditTravel";
import Register from "./components/connexion/Register";
import Login from "./components/connexion/Login";
import Profile from "./components/connexion/Profile";

function App() {
   const router = createBrowserRouter([
      {
         path: "/",
         element: <Home />,
      },
      {
         path: "/create",
         element: <CreateTravel />,
      },
      {
         path: "/details/:id",
         element: <DetailsTravel />,
      },
      {
         path: "/edit/:id",
         element: <EditTravel />,
      },
      {
         path: "/register",
         element: <Register />,
      },
      {
         path: "/login",
         element: <Login />,
      },
      {
         path: "/profile",
         element: <Profile />,
      },
   ]);
   return (
      <>
         <RouterProvider router={router} />
      </>
   );
}

export default App;
