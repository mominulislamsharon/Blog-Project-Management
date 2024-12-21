import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

//admin routes
router.post("/create-admin", UserController.createAdmin); 

//user routes

router.get("/", auth(USER_ROLE.admin) , UserController.getUser); 

router.get("/:id", auth(USER_ROLE.user), UserController.getSingleById); 

router.patch("/:id", auth(USER_ROLE.user), UserController.updateUser); 

router.delete("/:id",auth(USER_ROLE.admin), UserController.deleteUser);

export const userRoutes = router;