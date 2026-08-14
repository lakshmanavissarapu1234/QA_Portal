import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || "gemini-3.6-flash";

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not configured in .env");
}

const ai = new GoogleGenAI({
  apiKey,
});

export interface ManualTestCaseRequest {
  title: string;
  description: string;
  acceptanceCriteria: string;
  outputFormat: "Normal" | "Gherkin" | "Excel";
  testTypes: string[];
}

export async function generateManualTestCases(
  input: ManualTestCaseRequest
) {
  const prompt = `
You are an expert QA test case generation AI.

Your task is to analyze the provided user story and generate high-quality manual test cases.

USER STORY

Title:
${input.title}

Description:
${input.description}

Acceptance Criteria:
${input.acceptanceCriteria}

GENERATION OPTIONS

Output Format:
${input.outputFormat}

Test Types:
${input.testTypes.join(", ")}

INSTRUCTIONS

1. Carefully understand the user story.
2. Use the acceptance criteria as the main validation criteria.
3. Generate test cases only for the selected test types.
4. If Positive is selected, generate positive/valid scenarios.
5. If Negative is selected, generate invalid/error scenarios.
6. If Edge is selected, generate boundary and edge-case scenarios.
7. Do not invent functionality that is unrelated to the requirement.
8. Make the test steps clear and executable by a manual tester.
9. Include expected results for every test case.
10. Follow the requested output format.
11. Generate comprehensive but relevant test cases.
`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          testCases: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                testCaseId: {
                  type: Type.STRING,
                },
                title: {
                  type: Type.STRING,
                },
                testType: {
                  type: Type.STRING,
                },
                preconditions: {
                  type: Type.STRING,
                },
                steps: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.STRING,
                  },
                },
                testData: {
                  type: Type.STRING,
                },
                expectedResult: {
                  type: Type.STRING,
                },
              },
              required: [
                "testCaseId",
                "title",
                "testType",
                "preconditions",
                "steps",
                "testData",
                "expectedResult",
              ],
            },
          },
          outputFormat: {
            type: Type.STRING,
          },
        },
        required: ["testCases", "outputFormat"],
      },
    },
  });

  if (!response.text) {
    throw new Error("Gemini returned an empty response");
  }

  return JSON.parse(response.text);
}