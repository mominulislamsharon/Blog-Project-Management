import { model, Schema } from 'mongoose';
import { IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
    },
    content: {
      type: String,
      required: [true, 'Blog content is required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Blog = model<IBlog>('Blog', blogSchema);
