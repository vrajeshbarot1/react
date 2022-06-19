import React from 'react';
import './App.css';
import Home from './pages/Home';
import AddData from './pages/AddData';
import { BrowserRouter, Routes, Route, Link  } from "react-router-dom";
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="AddData" element={ <AddData/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
