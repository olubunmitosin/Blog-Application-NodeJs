import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserDocument } from '../interfaces/models';
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  let user = this as UserDocument;

  if (!user.isModified('password')) {
    return next();
  }

  const saltWorkFactor: number = parseInt(process.env.SALT_WORK_FACTOR ?? "10");
  const salt = await bcrypt.genSalt(saltWorkFactor);
  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((err: any) => false);
};

const UserModel = mongoose.model<UserDocument>('User', userSchema);
export default UserModel;