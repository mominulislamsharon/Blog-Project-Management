/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import config from '../../config';
import { IUser } from '../User/user.interface';
import { User } from '../User/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const login = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );
  if (!user) {
    throw 'Invalid credentials';
  }

  const isBlocked = user?.isBlocked;

  if (isBlocked === true) {
    throw 'User is blocked';
  }

  const isPasswordValid = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordValid) throw new Error('Invalid credentials');

  // Generate Token

  const token = jwt.sign(
    { email: user?.email, role: user?.role },
    config.jwt_secret!,
    {
      expiresIn: config.jwt_expires_in,
    },
  );

  const { password, ...remainData } = user;

  return { token, remainData };
};

export const AuthService = {
  register,
  login,
};
