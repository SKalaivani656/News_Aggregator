import { useState } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Header from "./components/Header";
import AllNews from "./components/AllNews";
import Footer from "./components/Footer";
import TopHeadlines from "./components/TopHeadlines";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryNews from "./components/CountryNews";


function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="w-full">
      
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }} >
        <Header />
        <Routes>
          <Route path="/" element={<AllNews />} />
          <Route path="/top-headlines/:category" element={<TopHeadlines />} />
          <Route path="/country/:iso" element={<CountryNews />} />
        </Routes>
        {/* <Cards />  */}
         <Footer />   
      </BrowserRouter>
    </div>
  );
}

export default App;
