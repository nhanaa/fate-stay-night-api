import { Router, Request, Response } from 'express';
import charactersJSON from '../../data/characters/characters.json';

const charactersRouter: Router = Router();

interface Character {
  id?: string;
  role?: string;
  image?: string;
}

// GET all characters
charactersRouter.get("/", (req, res) => {
  try {
    res.status(200).json(charactersJSON);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// GET character by id
charactersRouter.get("/id/:id", (req, res) => {
  const {id} = req.params;
  try {
    res.status(200).json(charactersJSON.filter((character: Character) => character.id === id));
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// GET masters characters
charactersRouter.get("/masters", (req, res) => {
  try {
    res.status(200).json(charactersJSON.filter((character: Character) => character.role === "master"));
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// GET servants characters
charactersRouter.get("/servants", (req, res) => {
  try {
    res.status(200).json(charactersJSON.filter((character: Character) => character.role === "servant"));
  }
  catch (err) {
    res.status(500).send(err);
  }
});

// GET non-participant characters
charactersRouter.get("/non-participant", (req, res) => {
  try {
    res.status(200).json(charactersJSON.filter((character: Character) => character.role === "non-participant"));
  }
  catch (err) {
    res.status(500).send(err);
  }
})

export default charactersRouter;
