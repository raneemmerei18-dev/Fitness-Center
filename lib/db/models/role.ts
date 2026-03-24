import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  id?: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: null },
  },
  { timestamps: true }
);

// Add virtual 'id' field that maps to '_id'
RoleSchema.virtual("id").get(function () {
  return this._id?.toString();
});

// Ensure virtuals are included in JSON output
RoleSchema.set("toJSON", { virtuals: true });

export default mongoose.models.Role || mongoose.model<IRole>("Role", RoleSchema);
