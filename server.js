import express from "express";
import geminiRouter from "./router/gemini.router.js";
import cors from "cors";
import LlamaRouter from "./router/LlamaRouter.router.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/gemini", geminiRouter);
app.use("/llama", LlamaRouter);
const PORT = process.env.PORT || 3000;

// const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is listen at http://localhost:${PORT}`);
});
