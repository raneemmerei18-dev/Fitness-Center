import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  id?: string;
  title: string;
  summary: string;
  details: string;
  imageUrl?: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    details: { type: String, required: true },
    imageUrl: { type: String, default: null },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Add virtual 'id' field that maps to '_id'
ServiceSchema.virtual("id").get(function () {
  return this._id?.toString();
});

// Ensure virtuals are included in JSON output
ServiceSchema.set("toJSON", { virtuals: true });

export default mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
