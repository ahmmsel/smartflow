import { google } from "@/lib/gemini";
import { inngest } from "./client";
import { generateText } from "ai";

export const executeAI = inngest.createFunction(
  { id: "execute-ai" },
  { event: "execute/ai" },
  async ({ event, step }) => {
    const { steps } = await step.ai.wrap("gemini-generate-text", generateText, {
      model: google("gemini-2.5-flash"),
      system:
        "You are a helpful assistant that generates text based on user prompts.",
      prompt: "what is inngest and why is it useful?",
    });

    return steps;
  }
);
