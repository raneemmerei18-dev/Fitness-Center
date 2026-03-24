import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  id?: string;
  title: string;
  slug: string;
  description: string;
  details: string;
  imageUrl?: string;
  location?: string;
  duration?: string;
  gallery?: unknown;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    imageUrl: { type: String, default: null },
    location: { type: String, default: null },
    duration: { type: String, default: null },
    gallery: { type: Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
);

// Add virtual 'id' field that maps to '_id'
ProjectSchema.virtual("id").get(function () {
  return this._id?.toString();
});

// Ensure virtuals are included in JSON output
ProjectSchema.set("toJSON", { virtuals: true });

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
