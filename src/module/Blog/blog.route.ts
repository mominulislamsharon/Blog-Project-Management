import express from 'express';
import { blogControllers } from './blog.controller';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/',auth(USER_ROLE.user), blogControllers.createBlog);

router.get('/', blogControllers.getAllBlogs);

router.patch('/:id',auth(USER_ROLE.user, USER_ROLE.admin), blogControllers.updateBlog);

router.delete('/:id', auth(USER_ROLE.admin), blogControllers.deleteBlog);

export const BlogRotues = router;
