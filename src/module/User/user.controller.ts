import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { userService } from './user.service';

const createAdmin = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await userService.createAdmin(payload);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'User created successfully',
    data: result,
  });
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUser();

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User getting successfully',
    data: result,
  });
});

const getSingleById = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await userService.getSingleById(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Blogs single successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const result = await userService.updateUser(id, body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  await userService.deleteUser(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User deleted successfully',
    data: id,
  });
});

export const UserController = {
  createAdmin,
  getUser,
  getSingleById,
  updateUser,
  deleteUser,
};
