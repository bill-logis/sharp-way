import mongoose, { Schema, Document} from "mongoose";

export interface ITask extends Document {
  id: string;
  title: string;
  description: string;
  status: string;
}

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITask>('Task', taskSchema);