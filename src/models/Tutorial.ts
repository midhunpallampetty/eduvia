import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITutorial extends Document {
  slug: string;
  title: string;
  content: string;
  codeExample?: string;
  tags?: string[]; // useful for search and categorization
  category?: string; // e.g. "JavaScript", "React"
  order?: number; // for sorting in sidebar
  isPublished: boolean; // draft or live
}

const TutorialSchema: Schema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    codeExample: { type: String },
    tags: [{ type: String }],
    category: { type: String, default: 'JavaScript' },
    order: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// If the model is already compiled, use it; else, create it
export default mongoose.models.Tutorial as Model<ITutorial> ||
  mongoose.model<ITutorial>('Tutorial', TutorialSchema);
