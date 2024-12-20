import { IUser } from '../User/user.interface';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: IUser) => {
  const result = await Blog.create(payload);

  return result;
};

const getAllBlogsFromDB = async () => {
  const result = await Blog.find();

  return result;
};

const updateBlogFromDB = async (id: string, payload: Partial<IBlog>) => {
  const result = await Blog.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
}

export const blogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogFromDB,
  deleteBlogFromDB,
};
