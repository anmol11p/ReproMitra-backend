import { Router } from "express";
import { geminiController } from "../controller/gemini.controller.js";
const geminiRouter = Router();

geminiRouter.route("/").post(geminiController);
export default geminiRouter;
