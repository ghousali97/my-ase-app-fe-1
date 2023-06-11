import React, { useContext } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Write from './pages/Write';
import Single from './pages/Single';
import { AuthContext } from './context/authContext';




function App() {

  const { currentUser } = useContext(AuthContext);
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/write",
        element: currentUser ? <Write /> : <Navigate to="/login" replace />
      }, {
        path: "/post/:id",
        element: <Single />
      }

    ]
  );

  return (<div className="app">
    <div className='container'>
      <RouterProvider router={router} />
    </div>
  </div>);


}

export default App;