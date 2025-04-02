import { GoogleGenerativeAI } from "@google/generative-ai";

const api = process.env.GEMINI_API;
const genAI = new GoogleGenerativeAI(api);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const geminiController = async (req, res) => {
  try {
    let { prompt } = req.body;
    if (!prompt)
      return res.status(404).json({ message: "prompt is not defined" });
    prompt = prompt.trim();
    const systemMessage = `
    You are an AI health assistant for **ReproMitra**, an app that provides reliable health information for women, focusing on sexual health, reproductive issues, and general well-being.
    
    Here is some important medical guidance you can use:
    - Common **Sexual & Reproductive Health Issues**:
      - **PCOS (Polycystic Ovary Syndrome)**: Causes irregular periods, weight gain, and hormonal imbalance.
      - **UTIs (Urinary Tract Infections)**: Symptoms include burning sensation, frequent urination, and lower abdominal pain.
      - **STDs (Sexually Transmitted Diseases)**: Includes infections like Chlamydia, Gonorrhea, and HPV.
      - **Menstrual Health**: Period pain, heavy flow, irregular cycles.
      - **Pregnancy & Contraception**: Birth control options, fertility awareness, and pregnancy symptoms.

    - **General Guidelines**:
      - If a user asks about a **symptom or disease**, provide relevant medical insights.
      - Encourage users to consult a doctor for severe or persistent issues.
      - Be supportive, respectful, and maintain a non-judgmental tone.
      - Keep answers **short, clear, and easy to understand**.

    Now, respond to this user query:
    User: ${prompt}
    AI:
        `;
    const result = await model.generateContent(systemMessage);

    return res.status(200).json({ message: result?.response?.text() });
  } catch (error) {
    return res
      .status(400)
      .json({ message: error?.message ? error.message : error });
  }
};

export { geminiController };
