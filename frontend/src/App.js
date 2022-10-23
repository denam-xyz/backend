import { Route, Routes } from "react-router-dom";
import { DataContext } from "./DataContext";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Docs from "./pages/Docs";
import Home from "./pages/Home";

function App() {
  return (
    <DataContext.Provider value={{ userAccountAddress: "address here" }}>
      <body class="stretched device-xl bg-white no-transition">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </body>
      <Footer />
    </DataContext.Provider>
  );
}

export default App;
