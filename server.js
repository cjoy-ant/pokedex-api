require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = 8000;
const validTypes = [
  `Bug`,
  `Dark`,
  `Dragon`,
  `Electric`,
  `Fairy`,
  `Fighting`,
  `Fire`,
  `Flying`,
  `Ghost`,
  `Grass`,
  `Ground`,
  `Ice`,
  `Normal`,
  `Poison`,
  `Psychic`,
  `Rock`,
  `Steel`,
  `Water`,
];

app.use(morgan("dev"));
app.use(validateBearerToken);

app.get("/types", handleGetTypes);
app.get("/pokemon", handleGetPokemon);

function validateBearerToken(req, res, next) {
  // const bearerToken = req.get("Authorization").split(" ")[1];
  const authToken = req.get("Authorization");
  const apiToken = process.env.API_TOKEN;

  //if (bearerToken !== apiToken) {
  //  return res.status(401).json({ error: "Unauthorized request" });
  //}

  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized Request" });
  }
  // move to the next middleware
  next();
}

function handleGetTypes(req, res) {
  res.json(validTypes);
}

function handleGetPokemon(req, res) {
  res.send("Hello, Pokemon!");
}

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
