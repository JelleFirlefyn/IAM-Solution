// import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import LoginButton from "./login/login";

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

  return (
    <div className="App">
      <h1>SPA with API</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <LoginButton></LoginButton>
    </div>
  );
}

export default App;
