import { GoogleGenerativeAI } from "@google/generative-ai";

const api = process.env.GEMINI_API;
const genAI = new GoogleGenerativeAI(api);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const geminiController = async (req, res) => {
  try {
    let { prompt, chatBoatName } = req.body;

    if (!chatBoatName) {
      return res.status(400).json({
        message: "Please provide the assistant's role (chatBoatName).",
      });
    }

    if (!prompt)
      return res.status(404).json({ message: "Prompt is not defined." });

    prompt = prompt.trim();

    const systemMessage = `${chatBoatName}
User: ${prompt}
AI:
    `;

    const result = await model.generateContent(systemMessage);
    const text = await result.response.text(); // Get the actual response text
    const cleanedText = text.replace(/\n/g, " "); // Remove \n or format it

    return res.status(200).json({ message: cleanedText });
  } catch (error) {
    return res
      .status(400)
      .json({ message: error?.message ? error.message : error });
  }
};

export { geminiController };
