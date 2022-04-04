import { Response } from "express";

/**
 * @param res Response
 * @param code HTTP status code
 * @param message Description of the error for the client
 * @param detail Description of the error for the developer
 * @returns Response
 */

export const handleHttpError = (
  res: Response,
  code = 403,
  message = "Error",
  detail?: string
): Response => {
  return res.status(code).json({ message });

  if (detail) {
    // Sentry.captureException(detail);
  }
};
