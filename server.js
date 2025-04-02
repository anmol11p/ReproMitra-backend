import express from "express";
import geminiRouter from "./router/gemini.router.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/gemini", geminiRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is listen at http://localhost:${PORT}`);
});
