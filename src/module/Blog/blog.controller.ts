import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { blogServices } from "./blog.service";


const createBlog = catchAsync(async (req, res) => {
  const result = await blogServices.createBlogIntoDB(req.body);

  sendResponse(res, { success: true, statusCode: StatusCodes.CREATED, message: 'Blog created successfully', data: result})
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogServices.getAllBlogsFromDB();

  sendResponse(res, { success: true, statusCode: StatusCodes.OK, message: 'Blogs fetched successfully', data: result })
});

const updateBlog = catchAsync(async (req, res) => {
  const id  = req.params.id;
  const body = req.body;
  const result = await blogServices.updateBlogFromDB(id, body)
  
  sendResponse(res, { success: true, statusCode: StatusCodes.OK, message: 'Blog updated successfully', data: result })
})


const deleteBlog = catchAsync(async (req, res) => {
  const id  = req.params.id;
  const result = await blogServices.deleteBlogFromDB(id)

  sendResponse(res, { success: true, statusCode: StatusCodes.OK, message: 'Blog deleted successfully', data: result })
})


export const blogControllers = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
}
