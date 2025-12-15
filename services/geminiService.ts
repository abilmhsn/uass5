import { GoogleGenAI, Type } from "@google/genai";
import { WasteAnalysisResult } from "../types/WasteResult";

// CATATAN: Di Expo Go, process.env tidak selalu jalan mulus tanpa konfigurasi extra (eas.json/babel-dotenv).
// Pastikan API Key valid. 
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "MASUKKAN_API_KEY_ANDA_DISINI" });

const SYSTEM_INSTRUCTION = `
You are an AI system for waste classification in a mobile app called "PeduliSampah".

TASK:
Analyze the provided image and identify whether it contains waste material.

STRICT RULES (MANDATORY):
1. You MUST respond ONLY in valid JSON format.
2. Do NOT add explanations, markdown, or extra text.
3. If you are unsure, make the best estimation.
4. If the image does NOT show waste, set "is_sampah" to false and leave other fields null.

WASTE CATEGORIES (ONLY USE ONE):
- Organik
- Plastik
- Kertas
- Logam
- B3
- Residu

GUIDELINES:
- Harga jual adalah estimasi kasar di Indonesia (Rupiah per Kg).
- Saran pengolahan harus satu kalimat instruksi praktis.
- Jangan menebak kategori di luar daftar.
`;

export const analyzeWasteImage = async (base64Image: string): Promise<WasteAnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image,
            },
          },
          {
            text: "Analyze this image according to the system instructions.",
          },
        ],
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            is_sampah: { type: Type.BOOLEAN },
            kategori_sampah: { 
              type: Type.STRING, 
              enum: ["Organik", "Plastik", "Kertas", "Logam", "B3", "Residu"] 
            },
            estimasi_harga_jual_rp_per_kg: { type: Type.NUMBER },
            saran_pengolahan: { type: Type.STRING },
          },
          required: ["is_sampah"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    return JSON.parse(text) as WasteAnalysisResult;
  } catch (error) {
    console.error("Error analyzing waste:", error);
    throw error;
  }
};