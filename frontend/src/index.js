import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App';
import LandingPage from "./LandingPage/LandingPage.js"
import Register from "./Registered/Register.js";
 
const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "", element: <LandingPage /> },
      {path:"register" , element: <Register/>}
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
