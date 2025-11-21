
import { GoogleGenAI } from "@google/genai";
import { Destination } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTravelLog = async (destination: Destination): Promise<string> => {
  try {
    const prompt = `
      You are the AI computer of a futuristic starship. 
      We have just arrived at ${destination.name} (${destination.type}).
      Distance from Earth: ${destination.distance}.
      
      Please generate a short, immersive "Arrival Log" in Chinese.
      Include:
      1. Current orbital status.
      2. Visual description of the planet/star from the window.
      3. Atmospheric or environmental readings (temperature, gravity, hazards).
      
      Tone: Sci-fi, professional, slightly poetic but informative.
      Format: Plain text, max 150 words.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    return response.text || "系统错误：无法连接到数据库。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "错误：通信阵列离线。无法获取详细遥测数据。";
  }
};

export const generatePlanetDetails = async (destinationName: string): Promise<string> => {
  try {
    const prompt = `Describe interesting facts about ${destinationName} for a space traveler in Chinese. Keep it brief (under 50 words).`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });
    return response.text || "数据不可用。";
  } catch (e) {
    return "正在检索数据...";
  }
};
