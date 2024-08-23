import mongoose from 'mongoose';

// Interface for user model
export interface UserInterface {
    email: string;
    name: string;
    password: string;
}

// UserDocument interface
export interface UserDocument extends UserInterface, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
}

// Interface for post model
export interface PostInterface {
    user_id: number;
    title: string;
    content: string;
    created_at: Date;
    updated_at: Date;
}

// PostDocument interface
export interface PostDocument extends PostInterface, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

// SessionDocument interface
export interface SessionDocument extends mongoose.Document {
    user: UserDocument['_id'];
    valid: boolean;
    userAgent: string;
    createdAt: Date;
    updatedAt: Date;
  }