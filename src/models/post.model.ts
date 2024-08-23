import mongoose from 'mongoose';
import { PostDocument } from '../interfaces/models';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: false },
    content: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

const PostModel = mongoose.model<PostDocument>('Post', postSchema);
export default PostModel;