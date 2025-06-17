/*import { GoogleGenerativeAI } from "@google/generative-ai";

async function main() {
  // Secure way to access API key via environment variable
  const apiKey = process.env.GOOGLE_API_KEY; 
  
  if (!apiKey) {
    console.error("Error: Please set the GOOGLE_API_KEY environment variable.");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const generationConfig = {
    responseMimeType: 'text/plain',
  };

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-pro-latest',
    generationConfig,
  });

  const contents = [{
    role: 'user',
    parts: [{
      text: "Write a short, dramatic story about a lonely lighthouse keeper who finds a message in a bottle.",
    }],
  }];

  try {
    const result = await model.generateContentStream(contents);

    console.log("--- AI Response Stream ---");
    for await (const chunk of result.stream) {
      process.stdout.write(chunk.text());
    }
    console.log("\n--- End of Stream ---");
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

main();*/

/*import{
  GoogleGenerativeAI,HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai"

const MODEL_NAME="gemini-1.5-pro ";
const API_KEY="AIzaSyCmrNKdd9XheDS9bvp7PUF8jeDos2zZOno";

async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME }); // Fixed incorrect `new` usage

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = await model.startChat({ // `await` added for async function
    generationConfig,
    safetySettings,
    history: [], // Ensure proper formatting
  });

  const result = await chat.sendMessage(prompt);
  console.log(result.response.text()); // Simplified response handling
  return response.text();
}

export default runChat;*/

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-pro-latest"; 

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

if (!API_KEY) {
  console.error("Error: Please set the GOOGLE_API_KEY environment variable.");
  process.exit(1);
}

async function runChat(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = await model.startChat({ 
      generationConfig,
      safetySettings,
      history: [], 
    });

    const result = await chat.sendMessage(prompt);
    console.log(result.response.text()); 

    return result.response.text(); // Ensure correct return value
  } catch (error) {
    console.error("Error generating content:", error);
    return null; // Graceful error handling
  }
}

export default runChat;