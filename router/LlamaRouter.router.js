import express from "express";
import { llamaController } from "../controller/llama.Controller.js";
const LlamaRouter = express.Router();

LlamaRouter.route("/").post(llamaController);
export default LlamaRouter;
