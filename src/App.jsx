import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import CreateTravel from "./pages/travel/CreateTravel";
import DetailsTravel from "./pages/travel/DetailsTravel";
import EditTravel from "./pages/travel/EditTravel";
import Register from "./pages/connexion/Register";
import Login from "./pages/connexion/Login";
import Profile from "./pages/profile/profile";
import { StatusProvider } from "./components/status/Status";

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
         <StatusProvider>
            <RouterProvider router={router} />
         </StatusProvider>
      </>
   );
}

export default App;
