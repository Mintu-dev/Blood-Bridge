import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App';
import LandingPage from "./LandingPage/LandingPage.js"
import Register from "./Registered/Register.js";
import Login from "./Registered/Login.js";
import Profile from "./Profile.js"
import ChangePassword from "./ChangePassword.js"
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Hero from "./Explore/Home.js"
import DonarForm from "./Registered/DonarRegister.js"
import EditFullname from  "./EditFullname.js"
import EditBio from "./EditBio.js"

 
const router = createBrowserRouter([
  {
    path: "",
        element: <App />,
    children: [
      { path: "/", element: <LandingPage /> },
      {path:"register" , element: <Register/>},
      {path:"login" , element: <Login/> },
      {path:"profile" , element: <Profile/>},
      {path:"explore" , element: <Hero/>},
      {path:"changepassword" , element: <ChangePassword/>},
      {path:"editfullname" , element: <EditFullname/>},
      {path:"editbio" , element: <EditBio/>},
       {path:"donarregister" , element: <DonarForm/>}
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
