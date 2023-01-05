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
    res.status(200).json(characters_json_1.default);
});
// GET character by id
charactersRouter.get("/id/:id", (req, res) => {
    const { id } = req.params;
    res.status(200).json(characters_json_1.default.filter((character) => character.id === id));
});
// GET masters characters
charactersRouter.get("/masters", (req, res) => {
    res.status(200).json(characters_json_1.default.filter((character) => character.role === "master"));
});
// GET servants characters
charactersRouter.get("/servants", (req, res) => {
    res.status(200).json(characters_json_1.default.filter((character) => character.role === "servant"));
});
exports.default = charactersRouter;
