"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const characters_1 = __importDefault(require("./routes/characters"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
// middleware
app.use(express_1.default.json());
// print out path
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(req.path, req.body);
    next();
});
app.use("/api/characters", characters_1.default);
app.listen(port, () => {
    console.log("Listening on port", port);
});
