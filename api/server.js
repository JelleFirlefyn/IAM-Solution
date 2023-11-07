const express = require("express");
const cors = require("cors"); // You need to install cors with npm
const app = express();
const { auth } = require("express-oauth2-jwt-bearer");

const PORT = process.env.PORT || 3001;

const jwtCheck = auth({
  audience: "jmdWNLf9mzZVgTXZn6fqd8NbN41QfnX6",
  issuerBaseURL: "https://dev-wfk714pl0dln3oip.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

// Set up a whitelist and check against it:
var whitelist = ["http://192.168.0.157:3000"]; // This is your client's URL
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // This is important for cookies, authorization headers with HTTPS
};

// Then pass them to cors:
app.use(cors(corsOptions));

// enforce JWT check on all endpoints
app.use(jwtCheck);

app.get("/authorized", function (req, res) {
  res.send("Secured Resource");
});

// Dummy Data
const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

app.get("/items", (req, res) => {
  res.json(items);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
