// src/components/LoginPage.js
import React from "react";
import userManager from "../services/usermanager";

// function handleFederatedLogout() {
//   let token;
//   userManager.getUser().then((user) => {
//     if (user) {
//       //   // You now have access to the identity token through user.id_token
//       //   console.log("Identity token", user.id_token);
//       token = user.id_token;
//     }
//   });

//   userManager
//     .signoutRedirect({
//       id_token_hint: token,
//     })
//     .then(() => {
//       userManager.removeUser(); // Optional, depends on whether you want to wait for redirect
//       console.log("Redirecting to auth server for logout...");
//     })
//     .catch(function (e) {
//       console.error(e);
//     });
// }

function handleLocalLogout() {
  userManager.removeUser().then(() => {
    // User is logged out locally, redirect to home or login page
    window.location = "/login";
  });
}

function LogoutPage() {
  const handleLogout = () => {
    // Choose one of these based on whether you want federated logout or not
    handleLocalLogout();
    //handleFederatedLogout();
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LogoutPage;
