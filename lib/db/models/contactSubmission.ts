import mongoose, { Schema, Document } from "mongoose";

export interface IContactSubmission extends Document {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: null },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

// Add virtual 'id' field that maps to '_id'
ContactSubmissionSchema.virtual("id").get(function () {
  return this._id?.toString();
});

// Ensure virtuals are included in JSON output
ContactSubmissionSchema.set("toJSON", { virtuals: true });

export default mongoose.models.ContactSubmission ||
  mongoose.model<IContactSubmission>("ContactSubmission", ContactSubmissionSchema);
