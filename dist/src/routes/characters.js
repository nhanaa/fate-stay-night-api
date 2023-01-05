"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const characters_json_1 = __importDefault(require("../../data/characters/characters.json"));
const charactersRouter = (0, express_1.Router)();
// GET all characters
charactersRouter.get("/", (req, res) => {
    console.log("GET all characters");
    console.log(JSON.stringify(characters_json_1.default));
    res.status(200).send(characters_json_1.default);
});
// GET character by id
charactersRouter.get("/:id", (req, res) => {
    console.log("GET a character by id");
    const { id } = req.params;
    res.status(200).json(characters_json_1.default.filter((character) => character.id === id));
});
// GET character images
charactersRouter.get("/:id/image", (req, res) => {
    console.log("GET a character image");
});
// GET masters characters
charactersRouter.get("/masters", (req, res) => {
    console.log("GET masters characters");
});
// GET servants characters
charactersRouter.get("/servants", (req, res) => {
    console.log("GET servants characters");
});
exports.default = charactersRouter;
