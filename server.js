require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const POKEDEX = require("./pokedex.json");

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
app.use(cors());
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
  const { name, type } = req.query;
  let results = POKEDEX.pokemon;

  if (name) {
    results = results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // if (type) {
  // results = results.filter((pokemon) => {
  // for (i = 0; i < pokemon.type.length; i++) {
  // pokemon.type[i].toLowerCase();
  // }
  // })
  // .filter((pokemon) => pokemon.type.includes(type.toLowerCase()));
  // }

  if (type) {
    results = results.filter((pokemon) => pokemon.type.includes(type));
  }

  res.json(results);

  //let response = POKEDEX.pokemon;

  // // filter our pokemon by name if name query param is present
  // if (req.query.name) {
  // response = response.filter((pokemon) =>
  // // case insensitive searching
  // pokemon.name.toLowerCase().includes(req.query.name.toLowerCase())
  // );
  // }

  // // filter our pokemon by type if type query param is present
  // if (req.query.type) {
  // response = response.filter((pokemon) =>
  // pokemon.type.includes(req.query.type)
  // );
  // }

  //res.json(response);
}

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
