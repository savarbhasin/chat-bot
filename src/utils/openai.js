import { GoogleGenerativeAI } from "@google/generative-ai";


async function sendMessage(message) {
    const genAI = new GoogleGenerativeAI('');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    
    const prompt = message;
  
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  }

export default sendMessage;