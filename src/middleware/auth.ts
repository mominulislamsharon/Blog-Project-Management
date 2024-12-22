/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../module/User/user.model';

const auth = (...requiredRole: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new Error('You are not authorized');
    }

    const tokenParts = authorizationHeader.split(' ');
    if (tokenParts[0] !== 'Bearer' || tokenParts.length !== 2) {
      throw new Error("Invalid token format. It must be 'Bearer <token>'");
    }

    const token = tokenParts[1];

    let decoded: JwtPayload;
    try {
      // Verify the token
      decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
    } catch (error) {
      throw new Error('Invalid token');
    }

    const { email, role } = decoded;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    if (user.isBlocked) {
      throw new Error('Your account is blocked');
    }

    // Check the role
    if (requiredRole.length && !requiredRole.includes(role)) {
      throw new Error('You are not authorized to perform this action');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
