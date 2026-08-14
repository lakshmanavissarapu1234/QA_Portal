import { Request, Response } from "express";
import {
  generateManualTestCases,
  ManualTestCaseRequest,
} from "../services/ai.service";

export async function generateManualTestCasesController(
  req: Request,
  res: Response
) {
  try {
    const {
      title,
      description,
      acceptanceCriteria,
      outputFormat,
      testTypes,
    } = req.body as ManualTestCaseRequest;

    // Validation
    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }

    if (!acceptanceCriteria?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Acceptance Criteria is required",
      });
    }

    if (!outputFormat) {
      return res.status(400).json({
        success: false,
        message: "Output Format is required",
      });
    }

    if (!Array.isArray(testTypes) || testTypes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one Test Type is required",
      });
    }

    const result = await generateManualTestCases({
      title,
      description,
      acceptanceCriteria,
      outputFormat,
      testTypes,
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Manual test case generation error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate manual test cases",
    });
  }
}