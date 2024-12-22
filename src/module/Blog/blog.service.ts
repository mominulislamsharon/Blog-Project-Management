import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/queryBuilder';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import { User } from '../User/user.model';

const createBlogIntoDB = async (payload: IBlog, user: JwtPayload) => {
  const email = user.email;

  const author = await User.findOne({ email }).select('_id');
  if (!author) {
    throw new Error('Author not found');
  }

  const blog = await Blog.create({
    ...payload,
    author: author._id,
  });

  const result = await Blog.findById(blog._id).populate('author');

  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['title', 'content'];
  const blogs = new QueryBuilder(Blog.find().populate('author'), query)
    .search(searchableFields)
    .filter()
    .sort();

  const result = await blogs.modelQuery;
  return result;
};

const updateBlogFromDB = async (id: string, payload: Partial<IBlog>) => {
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('author');

  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

export const blogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogFromDB,
  deleteBlogFromDB,
};
