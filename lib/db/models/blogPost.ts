import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost extends Document {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, default: null },
  },
  { timestamps: true }
);

// Add virtual 'id' field that maps to '_id'
BlogPostSchema.virtual("id").get(function () {
  return this._id?.toString();
});

// Ensure virtuals are included in JSON output
BlogPostSchema.set("toJSON", { virtuals: true });

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);
