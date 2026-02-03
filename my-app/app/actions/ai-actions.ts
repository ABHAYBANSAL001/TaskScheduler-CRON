// // "use server";

// // import { GoogleGenerativeAI } from "@google/generative-ai";

// // const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// // export async function generatePostContent(draft: string, platform: "TWITTER" | "LINKEDIN" | "GENERAL") {
// //   if (!draft) return null;

// //   try {
// //     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// //     let platformInstructions = "";

// //     if (platform === "TWITTER") {
// //       platformInstructions = `
// //         TARGET PLATFORM: X (Twitter)
// //         CONSTRAINTS:
// //         - STRICTLY under 280 characters (including hashtags). This is a hard limit.
// //         - Tone: Punchy, viral, casual but authoritative, "hook-based".
// //         - Formatting: Use short lines. No massive blocks of text.
// //         - Hashtags: Use 1-2 relevant, high-traffic hashtags at the end.
// //         - Objective: Maximize engagement and retweets.
// //       `;
// //     } else if (platform === "LINKEDIN") {
// //       platformInstructions = `
// //         TARGET PLATFORM: LinkedIn
// //         CONSTRAINTS:
// //         - Tone: Professional, value-driven, insightful, slightly personal business narrative.
// //         - Structure: Strong "Hook" (first line), "Value" (body), "Takeaway/Call to Action" (end).
// //         - Formatting: Use line breaks for readability. Use bullet points if listing items.
// //         - Length: medium-form (optimized for "See More" clicks).
// //         - Hashtags: Use 3-5 professional, niche-specific hashtags.
// //       `;
// //     } else {
// //       platformInstructions = `
// //         TARGET PLATFORM: General Social Media
// //         CONSTRAINTS:
// //         - Tone: Professional and engaging.
// //         - Length: Concise and clear.
// //       `;
// //     }

// //     const systemPrompt = `
// //       You are an expert Social Media Copywriter and Growth Strategist.
// //       Your task is to rewrite the user's draft content into a high-performing post.

// //       ${platformInstructions}

// //       INPUT DRAFT: "${draft}"

// //       INSTRUCTIONS:
// //       1. Improve grammar and clarity.
// //       2. Enhance the "hook" to grab attention immediately.
// //       3. Remove fluff. Make every word count.
// //       4. RETURN ONLY THE FINAL POST TEXT. Do not include introductory text like "Here is your post:".
// //       5. Do not use quotation marks around the output.
// //     `;

// //     const result = await model.generateContent(systemPrompt);
// //     const response = await result.response;
// //     return response.text();
    
// //   } catch (error) {
// //     console.error("AI Generation Error:", error);
// //     throw new Error("Failed to generate content");
// //   }
// // }

// "use server";

// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize API
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// // Configuration
// const MODELS_TO_TRY = ["gemini-2.0-flash", "gemini-1.5-flash"];

// function delay(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// export async function generatePostContent(
//   draft: string,
//   platform: "TWITTER" | "LINKEDIN" | "GENERAL"
// ) {
//   if (!draft) return { success: false, error: "Draft is empty" };

//   // 1. define prompt logic based on platform
//   let platformInstructions = "";
//   if (platform === "TWITTER") {
//     platformInstructions = `
//       TARGET PLATFORM: X (Twitter)
//       CONSTRAINTS:
//       - STRICTLY under 280 characters (including hashtags).
//       - Tone: Punchy, viral, hook-based.
//       - Hashtags: 1-2 max.
//     `;
//   } else if (platform === "LINKEDIN") {
//     platformInstructions = `
//       TARGET PLATFORM: LinkedIn
//       CONSTRAINTS:
//       - Tone: Professional, insightful, storytelling.
//       - formatting: Clean line breaks.
//       - Length: Medium-form.
//     `;
//   } else {
//     platformInstructions = `
//       TARGET PLATFORM: Social Media
//       CONSTRAINTS: Professional and engaging.
//     `;
//   }

//   const systemPrompt = `
//     You are an expert Social Media Copywriter. Rewrite the draft below.
//     ${platformInstructions}
//     INPUT DRAFT: "${draft}"
//     INSTRUCTIONS: Improve grammar, hook, and clarity. RETURN ONLY THE TEXT. No quotes.
//   `;

//   // 2. Try models with fallback logic
//   for (const modelName of MODELS_TO_TRY) {
//     try {
//       const model = genAI.getGenerativeModel({ model: modelName });
      
//       const result = await model.generateContent(systemPrompt);
//       const response = await result.response;
//       const text = response.text();
      
//       if (text) {
//         return { success: true, data: text };
//       }
//     } catch (error: any) {
//       console.warn(`AI Generation failed on model ${modelName}:`, error.message);
      
//       // If it's the last model in the list, we have to give up
//       if (modelName === MODELS_TO_TRY[MODELS_TO_TRY.length - 1]) {
//         // Return a clean error object, don't throw to avoid 500 pages
//         if (error.message?.includes("429")) {
//             return { success: false, error: "AI is busy. Please try again in a moment." };
//         }
//         return { success: false, error: "Failed to generate content. Try again." };
//       }

//       // If not the last model, wait a second and try the next one
//       await delay(1000);
//     }
//   }

//   return { success: false, error: "Unable to generate content at this time." };
// }

"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// Fallback strategy: Try 2.0 Flash first, then 1.5 Flash if busy
const MODELS_TO_TRY = ["gemini-2.0-flash", "gemini-1.5-flash"];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generatePostContent(
  draft: string,
  platform: "TWITTER" | "LINKEDIN" | "GENERAL"
) {
  if (!draft) return { success: false, error: "Draft is empty" };

  try {
    let platformInstructions = "";

    // Professional Prompt Engineering
    if (platform === "TWITTER") {
      platformInstructions = `
        TARGET PLATFORM: X (Twitter)
        CONSTRAINTS:
        - STRICTLY under 280 characters (including hashtags). This is a HARD limit.
        - Tone: Punchy, viral, casual but authoritative, "hook-based".
        - Formatting: Short lines. No massive blocks of text.
        - Hashtags: Use 1-2 relevant, high-traffic hashtags at the very end.
        - Objective: Maximize engagement and reposts.
      `;
    } else if (platform === "LINKEDIN") {
      platformInstructions = `
        TARGET PLATFORM: LinkedIn
        CONSTRAINTS:
        - Tone: Professional, value-driven, slightly personal business narrative.
        - Structure: Strong "Hook" (first line), "Value" (body), "Takeaway/Call to Action" (end).
        - Formatting: Use clean line breaks for readability. 
        - Length: Medium-form (optimized for "See More" clicks).
        - Hashtags: Use 3-5 professional hashtags.
      `;
    } else {
      platformInstructions = `
        TARGET PLATFORM: General Social Media
        CONSTRAINTS: Professional, engaging, and clear.
      `;
    }

    const systemPrompt = `
      You are an expert Social Media Copywriter and Growth Strategist.
      Rewrite the user's draft content into a high-performing post.
      
      ${platformInstructions}

      INPUT DRAFT: "${draft}"

      INSTRUCTIONS:
      1. Improve grammar, punchiness, and clarity.
      2. Enhance the "hook" to grab attention immediately.
      3. Remove fluff. Make every word count.
      4. RETURN ONLY THE FINAL POST TEXT. No intro/outro. No quotes.
    `;

    // Try models in sequence
    for (const modelName of MODELS_TO_TRY) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();
        
        if (text) {
          return { success: true, data: text };
        }
      } catch (innerError: any) {
        console.warn(`Model ${modelName} failed:`, innerError.message);
        // If this was the last model, throw to the outer catch block
        if (modelName === MODELS_TO_TRY[MODELS_TO_TRY.length - 1]) {
          throw innerError;
        }
        // Otherwise wait a bit and try the next model
        await delay(1000);
      }
    }

    throw new Error("All models failed");

  } catch (error: any) {
    console.error("AI Generation Action Error:", error);
    
    // Return a safe error object to the UI (prevents 500 Page Crash)
    let errorMessage = "AI generation failed. Please try again.";
    
    if (error.message?.includes("429") || error.message?.includes("Resource exhausted")) {
      errorMessage = "AI is currently busy. Please try again in a few seconds.";
    }

    return { success: false, error: errorMessage };
  }
}