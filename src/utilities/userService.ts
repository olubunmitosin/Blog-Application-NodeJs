import { FilterQuery } from 'mongoose';
import { omit } from 'lodash';
import UserModel from '../models/user.model';
import { UserDocument, UserInterface } from '../interfaces/models';

// Create user
export const createUser = async (input: UserInterface) => {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), 'password');
  } catch (err: any) {
    throw new Error(err);
  }
};

// Validate password
export const validatePassword = async ({ email, password }: { email: string; password: string }) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);
  if (!isValid) return false;
  return omit(user.toJSON(), 'password');
};

// Find user
export const findUser = async (query: FilterQuery<UserDocument>) => {
  return UserModel.findOne(query).lean();
};