import { Response } from 'express';

type TSuccessResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  token?: string;
  data?: T;
};

const sendResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
  // Send response to client
  res.status(data.statusCode).json({
    success: true,
    message: data.message,
    statusCode: data.statusCode,
    token: data.token,
    data: data.data,
  });
};

export default sendResponse;
