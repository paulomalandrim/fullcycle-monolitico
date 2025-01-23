"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = require("./express");
dotenv_1.default.config();
const port = Number(process.env.PORT) || 3000;
express_1.app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
