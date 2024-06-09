// Router.js
import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';

import Home from '../Views/home';
import Register from '../Views/RegisterUser';
import Login from '../Views/login';
import PrivateRoute from './Private';
import Header from '../Components/header';

const AppRouter = () => {
  return (
    <Router>
        <Header />
      <Routes>
      <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<Home/>}/>
          </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
