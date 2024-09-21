import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.API_KEY);
console.log(process.env.API_KEY);
const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getAiResponse = async (prompt) => {
  const prePromptData = `You are a AI farming assistant. You will be sent some Data by a user and you have a preidct a crop from 
    this given list [ maize, chickpea, kidneybeans, pigeonpeas, mothbeans, 
    mungbean, blackgram, lentil, pomegranate, banana, mango, grapes, watermelon, 
    muskmelon, apple, orange, papaya, coconut, cotton, jute, coffee].\n`;

  const postPromptData = `\nGiven this data predict a crop from the list above with your knowledge. And only just mentioning the crop is fine, rest no text required. Also randomize the result a bit`;

  // console.log("Prompt : ", prePromptData + prompt + postPromptData)
  const result = await model.generateContent(
    prePromptData + prompt + postPromptData
  );

  console.log("Response from Model : ", result.response.text().trim(), "\n");

  return result.response.text().trim();
};
