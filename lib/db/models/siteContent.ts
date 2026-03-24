import mongoose, { Schema, Document } from "mongoose";

export interface ISiteContent extends Document {
  id?: string;
  key: string;
  title?: string;
  subtitle?: string;
  body?: string;
  imageUrl?: string;
  details?: string;
  updatedAt: Date;
}

const SiteContentSchema = new Schema<ISiteContent>(
  {
    key: { type: String, required: true, unique: true },
    title: { type: String, default: null },
    subtitle: { type: String, default: null },
    body: { type: String, default: null },
    imageUrl: { type: String, default: null },
    details: { type: String, default: null },
  },
  { timestamps: true }
);

// Add virtual 'id' field that maps to '_id'
SiteContentSchema.virtual("id").get(function () {
  return this._id?.toString();
});

// Ensure virtuals are included in JSON output
SiteContentSchema.set("toJSON", { virtuals: true });

export default mongoose.models.SiteContent ||
  mongoose.model<ISiteContent>("SiteContent", SiteContentSchema);
