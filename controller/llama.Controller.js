import axios from "axios";

const HUGGINGFACE_TOKEN = process.env.LLAMA_TOKEN;
const HF_API_URL =
  "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct";

// Function to send prompt to Hugging Face Llama API
const generateResponseFromLLM = async (query, assistantRole) => {
  const prompt = `<|begin_of_text|><|start_header_id|>system<|end_header_id|>
${assistantRole}
<|eot_id|>
<|start_header_id|>user<|end_header_id|>
${query}
<|eot_id|>
<|start_header_id|>assistant<|end_header_id|>
`;

  const payload = {
    inputs: prompt,
    parameters: {
      max_new_tokens: 500,
      temperature: 0.01,
      top_k: 50,
      top_p: 0.95,
      return_full_text: false,
    },
  };

  const response = await axios.post(HF_API_URL, payload, {
    headers: {
      Authorization: `Bearer ${HUGGINGFACE_TOKEN}`,
    },
  });

  return response.data[0]?.generated_text || "No response generated.";
};

// Controller for handling POST requests
const llamaController = async (req, res) => {
  try {
    const { text, chatBoatName } = req.body;

    if (!chatBoatName) {
      return res.status(400).json({
        message: "Please provide the assistant's role (chatBoatName).",
      });
    }

    if (!text) {
      return res
        .status(400)
        .json({ message: "Text input is required for processing." });
    }

    const responseText = await generateResponseFromLLM(text, chatBoatName);
    return res.status(200).json({ summary: responseText });
  } catch (error) {
    console.error("Error in llamaController:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};

export { llamaController };
