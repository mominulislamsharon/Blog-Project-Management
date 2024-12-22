import express from 'express';
import auth from '../../middleware/auth';
import { adminController } from './admin.controller';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  adminController.blockUser,
);

router.delete('/blogs/:id', auth(USER_ROLE.admin), adminController.deletBlog);

export const AdminRoutes = router;
