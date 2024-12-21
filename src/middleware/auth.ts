
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../module/User/user.model";


const auth = (...requiredRole: string[]) => {
  return catchAsync(async(req: Request, res: Response, next:NextFunction) => {

    

    const token = req.headers.authorization;


    if (!token) {
      throw new Error("Your are not authorized")
    }

    const decoded = jwt.verify(
      token,
      config.jwt_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded;

    const user = await User.findOne({ email})

      if (!user) {
        throw new Error("User not found")
      }

      

      if (requiredRole && !requiredRole.includes(role)) {
        throw new Error("You are not authorized to perform this action")
      }

      req.user = decoded as JwtPayload;

      next();

  })
}

export default auth;