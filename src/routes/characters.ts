import { Router, Request, Response } from 'express';
import charactersJSON from '../../data/characters/characters.json';

const charactersRouter: Router = Router();

interface character {
  id?: string;
  role?: string;
  image?: string;
}

// GET all characters
charactersRouter.get("/", (req, res) => {
  res.status(200).json(charactersJSON);
});

// GET character by id
charactersRouter.get("/id/:id", (req, res) => {
  const {id} = req.params;

  res.status(200).json(charactersJSON.filter((character: character) => character.id === id));
});

// GET masters characters
charactersRouter.get("/masters", (req, res) => {
  res.status(200).json(charactersJSON.filter((character: character) => character.role === "master"))
});

// GET servants characters
charactersRouter.get("/servants", (req, res) => {
  res.status(200).json(charactersJSON.filter((character: character) => character.role === "servant"))
});

// GET non-participant characters
charactersRouter.get("/non-participant", (req, res) => {
  res.status(200).json(charactersJSON.filter((character: character) => character.role === "non-participant"))
})


export default charactersRouter;
