import { Document, Schema, model, models } from "mongoose";

export interface IQuiz extends Document {
	_id: string;
	title: string;
	description?: string;
	imageUrl: string;
	category: { _id: string; name: string };
	createdBy: { _id: string; firstName: string; lastName: string };
	createdAt: Date;
}

const QuizSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String },
	imageUrl: { type: String, required: true },
	category: { type: Schema.Types.ObjectId, ref: "Category" },
	createdBy: { type: Schema.Types.ObjectId, ref: "User" },
	createdAt: { type: Date, default: Date.now },
});

const Quiz = models.Quiz || model("Quiz", QuizSchema);

export default Quiz;
