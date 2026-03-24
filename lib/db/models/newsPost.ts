import mongoose, { Schema, Document } from "mongoose";

export interface INewsPost extends Document {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NewsPostSchema = new Schema<INewsPost>(
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
NewsPostSchema.virtual("id").get(function () {
  return this._id?.toString();
});

// Ensure virtuals are included in JSON output
NewsPostSchema.set("toJSON", { virtuals: true });

export default mongoose.models.NewsPost || mongoose.model<INewsPost>("NewsPost", NewsPostSchema);
