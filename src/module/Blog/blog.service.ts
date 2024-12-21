import QueryBuilder from '../../builder/queryBuilder';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: IBlog) => {
  const blog = await Blog.create(payload);

  const result = await Blog.findById(blog._id).populate('author', 'name email');

  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['title', 'content'];
  const blogs = new QueryBuilder(
    Blog.find().populate('author', 'name email'),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort();

  const result = await blogs.modelQuery;
  return result;
};

const updateBlogFromDB = async (id: string, payload: Partial<IBlog>) => {
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate('author', 'name email');

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
