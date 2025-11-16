
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Using a mock response.");
}

const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : null;

const recommendationSchema = {
  type: Type.OBJECT,
  properties: {
    productId: {
      type: Type.STRING,
      description: "The ID of the recommended product, e.g., 'oud-001'."
    },
    reasoning: {
      type: Type.STRING,
      description: "A detailed, persuasive explanation of why this specific oud is the perfect match for the user's preferences, written in the persona of a master perfumer."
    },
    occasionSuggestion: {
      type: Type.STRING,
      description: "A suggestion for an ideal occasion or setting to wear this fragrance."
    }
  },
  required: ['productId', 'reasoning', 'occasionSuggestion']
};

interface GeminiRecommendation {
  productId: string;
  reasoning: string;
  occasionSuggestion: string;
}

const generateMockRecommendation = (products: Product[]): GeminiRecommendation => {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    return {
        productId: randomProduct.id,
        reasoning: "This is a mock recommendation. In a real application with a valid API key, Gemini would provide a detailed analysis based on your choices. This choice was selected randomly as a placeholder.",
        occasionSuggestion: "Any special event where you want to feel unique."
    };
}


export const getOudRecommendation = async (
  preferences: { occasion: string; mood: string; scents: string[] },
  products: Product[]
): Promise<GeminiRecommendation> => {

  if (!ai) {
    return generateMockRecommendation(products);
  }

  const productInfoForPrompt = products.map(p => 
    `{ id: "${p.id}", name: "${p.name}", scentProfile: [${p.scentProfile.map(s => `"${s}"`).join(', ')}] }`
  ).join('\n');

  const prompt = `
    You are a world-renowned master perfumer at a luxury oud emporium. 
    A client is seeking your expert advice to find their perfect scent. 
    Analyze the client's preferences and recommend ONE product from the provided list.

    **Client's Preferences:**
    - Occasion: ${preferences.occasion}
    - Desired Mood: ${preferences.mood}
    - Preferred Scent Families: ${preferences.scents.join(', ')}

    **Available Products:**
    ${productInfoForPrompt}

    Based on this information, select the single best product for the client and provide your reasoning in the specified JSON format. 
    Your reasoning should be eloquent, evocative, and justify your choice by connecting the product's scent profile to the client's preferences.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: recommendationSchema,
      },
    });

    const jsonText = response.text;
    const parsedResponse = JSON.parse(jsonText);

    // Validate that the recommended product ID exists
    if (products.some(p => p.id === parsedResponse.productId)) {
        return parsedResponse;
    } else {
        console.error("Gemini recommended a non-existent product ID. Falling back to mock.");
        return generateMockRecommendation(products);
    }
  } catch (error) {
    console.error("Error fetching recommendation from Gemini API:", error);
    // Fallback to mock response on API error
    return generateMockRecommendation(products);
  }
};
