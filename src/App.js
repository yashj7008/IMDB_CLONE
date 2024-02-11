import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import Home from "./components/Home";

function App() {
  return (
    <>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/watchlist" element={<WatchList/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
