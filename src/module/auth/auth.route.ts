import { Router } from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { UserValidation } from "../User/user.validation";
import { authValidation } from "./auth.validation";


const router = Router();

// middleware
router.post('/register', validateRequest(UserValidation.userValidationSchema), authController.register);

router.post('/login', validateRequest(authValidation.loginValidationSchema), authController.login);




export const authRouters = router;