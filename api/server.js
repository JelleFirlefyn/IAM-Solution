const express = require("express");
const cors = require("cors");
const { auth } = require("express-oauth2-jwt-bearer");
const { exec } = require("child_process");

const app = express();
const PORT = process.env.PORT || 3001;

const opaEndpoint = "http://192.168.146.59:8181/v1/data/main/allow";

const jwtCheck = auth({
  audience: "jmdWNLf9mzZVgTXZn6fqd8NbN41QfnX6",
  issuerBaseURL: "https://dev-wfk714pl0dln3oip.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(jwtCheck);

app.use(async (req, res, next) => {
  try {
    const token2 = req.get("Authorization");
    const clientIp = req.ip; // Get the client's IP address
    console.log("client ip: ", clientIp)

    // Construct the curl command
    console.log("Authorization Header:", token2);
    const curlCommand = `curl -s -X POST -H "Content-Type: application/json" -d '{"input": {"ip": "${clientIp}", "attributes": {"request": {"http": {"headers": {"authorization": "${token2}"}}}}}}' ${opaEndpoint}`;

    // OLDDDDD test
    // const token2 = req.get("Authorization");

    // // Construct the curl command
    // console.log("Authorization Header:", token2);
    // const curlCommand = `curl -s -X POST -H "Content-Type: application/json" -d '{"input": {"attributes": {"request": {"http": {"headers": {"authorization": "${token2}"}}}}}}' ${opaEndpoint}`;

    // Execute the curl command
    exec(curlCommand, (error, stdout, stderr) => {
      if (error) {
        console.error("Error during OPA authorization:", error.message);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      console.log("Curl Output:", stdout); // Log the curl command output

      try {
        const opaResponse = JSON.parse(stdout);

        console.log("OPA Response:", opaResponse); // Log the parsed OPA response

        if (opaResponse.result === true) {
          next(); // Continue to the next middleware or route handler
        } else {
          res.status(403).json({ error: "Unauthorized" });
        }
      } catch (parseError) {
        console.error("Error parsing OPA response:", parseError.message);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  } catch (error) {
    console.error("Error during OPA authorization:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

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
