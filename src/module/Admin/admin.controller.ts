import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { User } from '../User/user.model';
import { Blog } from '../Blog/blog.model';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  if (user.isBlocked) {
    throw new Error('User is already blocked');
  }

  user.isBlocked = true;
  await user.save();

  // Return success response
  return sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: StatusCodes.OK,
  });
});

const deletBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findByIdAndDelete(id);

  if (!blog) {
    throw new Error('Blog not found');
  }

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});

export const adminController = {
  blockUser,
  deletBlog,
};
