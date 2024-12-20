import { z } from 'zod';

 const createBlogSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters long'),
  author: z.string().nonempty('Author ID is required'),
  isPublished: z.boolean().optional(),
});

 const updateBlogSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  content: z.string().min(10).optional(),
  isPublished: z.boolean().optional(),
});

export const blogValidations = {
  createBlogSchema,
  updateBlogSchema,
}
