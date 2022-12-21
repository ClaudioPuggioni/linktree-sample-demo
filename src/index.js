import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import MakeLinks from "./components/MakeLinks";
import UserPublic from "./components/UserPublic";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Router>
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/:username/edit"} element={<MakeLinks />} />
        <Route path={"/:username"} element={<UserPublic />} />
      </Routes>
    </Router>
  </>
);
