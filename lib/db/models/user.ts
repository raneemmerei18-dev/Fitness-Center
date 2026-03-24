import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  isSuperAdmin: boolean;
  roleId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    isSuperAdmin: { type: Boolean, default: false },
    roleId: { type: Schema.Types.ObjectId, ref: "Role", default: null },
  },
  { timestamps: true }
);

// Add virtual 'id' field that maps to '_id'
UserSchema.virtual("id").get(function () {
  return this._id?.toString();
});

// Ensure virtuals are included in JSON output
UserSchema.set("toJSON", { virtuals: true });

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
