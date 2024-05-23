import './App.css';
import './css/footer.css';
import Navbar_d from './Navbar_d';
import Home from './Home';
import Home2 from './Home2';
import WatchList from './WatchList';
import PortFolio from './PortFolio';
import NavSticky1 from './NavSticky1';

import NewsModel from './Models/NewsModel';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useLayoutEffect } from 'react';
//import React, { useState, useEffect } from 'react';

const ClearPageRefresh = () => {
  useEffect(() => {
      window.localStorage.clear();
  }, []);
};

function App() {
  ClearPageRefresh();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar_d />
        <NavSticky1></NavSticky1>
        <Routes>
          
          <Route path="/" element={<Navigate to="/search/home" />} />
          <Route path="/search/home" element={<Home />}/>

          <Route path="/search/:searchParam" element={<Home2 />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/portfolio" element={<PortFolio />} />
          <Route path="/checking" element={<NewsModel/>}/>
        </Routes>
        <footer className='fs-6'>
          Powered by <a href="https://finnhub.io/" target="_blank" rel="noopener noreferrer">Finnhub.io</a>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
