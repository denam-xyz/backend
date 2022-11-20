import { Route, Routes } from "react-router-dom";
import { DataContext } from "./DataContext";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DomainSearch from "./pages/DomainSearch";
import Home from "./pages/Home";

function App() {
  return (
    <DataContext.Provider value={{ userAccountAddress: "address here" }}>
      <body className="stretched device-xl bg-white no-transition">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<DomainSearch />} />
        </Routes>
      </body>
      <Footer />
    </DataContext.Provider>
  );
}

export default App;
