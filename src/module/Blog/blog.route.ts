import express from 'express';
import { blogControllers } from './blog.controller';

const router = express.Router();

router.post('/', blogControllers.createBlog);

router.get('/', blogControllers.getAllBlogs);

router.patch('/:id', blogControllers.updateBlog);

router.delete('/:id', blogControllers.deleteBlog);

export const BlogRotues = router;
