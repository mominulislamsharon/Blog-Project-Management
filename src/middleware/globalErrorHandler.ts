/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleZodError } from '../allErrorHelp/handleZodError';
import { handleCastError } from '../allErrorHelp/handleCastError';
import { handleValidationError } from '../allErrorHelp/handleValidationError';
import { handleDuplicateError } from '../allErrorHelp/handleDuplicateError';
import { handleError } from '../allErrorHelp/handleError';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.name && err.name === 'ZodError') {
    handleZodError(err, res);
  } else if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res);
  } else if (err?.code && err.code === 11000) {
    handleDuplicateError(err, res);
  } else if (err instanceof Error) {
    handleError(err, res);
  }
};
