import mongoose, { Schema, Document } from "mongoose";

export enum Section {
  HOME = "HOME",
  ABOUT = "ABOUT",
  SERVICES = "SERVICES",
  PROJECTS = "PROJECTS",
  BLOG = "BLOG",
  NEWS = "NEWS",
  CONTACT = "CONTACT",
  SUBMISSIONS = "SUBMISSIONS",
  USERS = "USERS",
}

export interface IRolePermission extends Document {
  id?: string;
  roleId: mongoose.Types.ObjectId;
  section: Section;
  createdAt: Date;
  updatedAt: Date;
}

const RolePermissionSchema = new Schema<IRolePermission>(
  {
    roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    section: {
      type: String,
      enum: Object.values(Section),
      required: true,
    },
  },
  { timestamps: true }
);

// Create compound unique index
RolePermissionSchema.index({ roleId: 1, section: 1 }, { unique: true });

// Add virtual 'id' field that maps to '_id'
RolePermissionSchema.virtual("id").get(function () {
  return this._id?.toString();
});

// Ensure virtuals are included in JSON output
RolePermissionSchema.set("toJSON", { virtuals: true });

export default mongoose.models.RolePermission ||
  mongoose.model<IRolePermission>("RolePermission", RolePermissionSchema);
