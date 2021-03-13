require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
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
app.use(helmet());
// helmet should be used BEFORE cors
app.use(cors());
app.use(validateBearerToken);

app.get("/types", handleGetTypes);
app.get("/pokemon", handleGetPokemon);

function validateBearerToken(req, res, next) {
  const authToken = req.get("Authorization");
  const apiToken = process.env.API_TOKEN;

  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized Request" });
  }
  next();
}

function handleGetTypes(req, res) {
  res.json(validTypes);
}

function handleGetPokemon(req, res) {
  const { name, type } = req.query;
  let response = POKEDEX.pokemon;

  if (name) {
    response = response.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (type) {
    response = response.filter((pokemon) => pokemon.type.includes(type));
  }

  res.json(response);
}

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
