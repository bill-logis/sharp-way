import mongoose, { Schema, Document } from "mongoose"

export interface IProject extends Document {
    id: string;
    name: string;
}

const projectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        }
    }
);

export default mongoose.model<IProject>('Project', projectSchema);