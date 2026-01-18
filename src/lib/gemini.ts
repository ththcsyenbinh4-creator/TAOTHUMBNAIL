import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

export const generateAnimePrompt = async (style: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const styleDescriptions: Record<string, string> = {
    vibrant: "vibrant anime style with bright colors, sharp details, modern anime aesthetic",
    ghibli: "Studio Ghibli style with soft watercolor tones, dreamy atmosphere, hand-drawn quality",
    dark: "dark fantasy anime with dramatic lighting, gothic elements, moody atmosphere",
    cyberpunk: "cyberpunk anime with neon colors, futuristic elements, high-tech aesthetic"
  };

  const prompt = `Create a detailed image generation prompt for converting a photo to ${styleDescriptions[style] || styleDescriptions.vibrant}. 
  
  The prompt should be concise (under 100 words) and focus on:
  - Artistic style and technique
  - Color palette and lighting
  - Level of detail and composition
  
  Return ONLY the prompt text, no explanations.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const generateSEOSuggestions = async (context: string): Promise<{
  title: string;
  thumbnailText: string;
  colors: string[];
}> => {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Generate YouTube SEO metadata for a video thumbnail with this context: "${context}"

Return a JSON object with:
{
  "title": "Catchy English title under 60 characters",
  "thumbnailText": "Short punchy text 1-4 words for thumbnail",
  "colors": ["#hex1", "#hex2", "#hex3"] (attention-grabbing colors)
}

Return ONLY valid JSON, no markdown or explanations.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text().replace(/```json|```/g, '').trim();

  try {
    return JSON.parse(text);
  } catch {
    // Fallback if parsing fails
    return {
      title: "Amazing Anime Transformation",
      thumbnailText: "WOW",
      colors: ["#FF0000", "#FFFF00", "#00FFFF"]
    };
  }
};
