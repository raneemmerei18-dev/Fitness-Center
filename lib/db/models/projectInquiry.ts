import mongoose, { Schema, Document } from "mongoose";

export interface IProjectInquiry extends Document {
  id?: string;
  projectId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: Date;
}

const ProjectInquirySchema = new Schema<IProjectInquiry>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: null },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

// Add virtual 'id' field that maps to '_id'
ProjectInquirySchema.virtual("id").get(function () {
  return this._id?.toString();
});

// Ensure virtuals are included in JSON output
ProjectInquirySchema.set("toJSON", { virtuals: true });

export default mongoose.models.ProjectInquiry ||
  mongoose.model<IProjectInquiry>("ProjectInquiry", ProjectInquirySchema);
