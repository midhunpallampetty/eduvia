import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IQnA extends Document {
  tutorialSlug: string; // reference to the tutorial topic via slug
  question: string;
  answer: string;
}

const QnASchema: Schema = new Schema(
  {
    tutorialSlug: { type:String, required: true, ref: 'Tutorial' }, // ✅ updated key name
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.QnA as Model<IQnA> || mongoose.model<IQnA>('QnA', QnASchema);
