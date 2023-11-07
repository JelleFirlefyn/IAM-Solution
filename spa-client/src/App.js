// import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import CallbackPage from "./components/CallbackPage";
import userManager from "./services/usermanager";
import LogoutPage from "./components/LogoutPage";

function App() {
  // GET USER INFO:
  const [userProfile, setUserProfile] = useState(null);
  // const [id_token, setIdToken] = useState(null);

  useEffect(() => {
    userManager.getUser().then((user) => {
      if (user) {
        // Now you can set the user profile information in the state
        setUserProfile(user.profile);
        // setIdToken(user.id_token);
      }
    });
  }, []);

  // GET API
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Function to fetch the access token and then make the API call
    const fetchData = async () => {
      try {
        // Get the user and hence the access token
        const user = await userManager.getUser();
        if (user && user.id_token) {
          // Fetch items from the API with the access token in the Authorization header
          const response = await fetch("http://192.168.0.157/:3001/items", {
            headers: {
              Authorization: `Bearer ${user.id_token}`,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setItems(data);
        } else {
          // Handle the case where the user is not logged in or the token is expired
          let errorText = [
            { id: 1, name: "User not logged in or token expired." },
          ];
          setItems(errorText);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // // TESTING PURPOSES:
  // userManager.getUser().then((user) => {
  //   if (user) {
  //     // You now have access to the identity token through user.id_token
  //     console.log("Identity token", user.id_token);
  //   }
  // });

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/callback" element={<CallbackPage />} />
        </Routes>
        <h1>SPA with API</h1>
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
        {userProfile && (
          <div>
            <p>Name: {userProfile.nickname}</p>
            <p>Email: {userProfile.email}</p>
            {/* Render other user information as needed */}
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
