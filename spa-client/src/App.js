// import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import CallbackPage from "./components/CallbackPage";
import userManager from "./services/usermanager";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the API
    fetch("http://localhost:3001/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  userManager.getUser().then((user) => {
    if (user) {
      // You now have access to the identity token through user.id_token
      console.log("Identity token", user.id_token);
    }
  });

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/callback" element={<CallbackPage />} />
        </Routes>
        <h1>SPA with API</h1>
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </Router>
    </div>
  );
}

export default App;
