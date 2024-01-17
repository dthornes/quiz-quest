import { Document, Schema, model, models } from "mongoose";

export interface IQuiz extends Document {
	_id: string;
	roomCode: string;
	title: string;
	description?: string;
	imageUrl: string;
	quizItems: QuizQuestions[];
	category: { _id: string; name: string };
	isActive: boolean;
	createdBy: { _id: string; firstName: string; lastName: string };
	createdAt: Date;
}

export type QuizQuestions = {
	_id: string;
	question: string;
	correctAnswer: string;
	incorrectAnswers: string[];
};

const quizItemSchema = new Schema({
	question: { type: String, required: true },
	correctAnswer: { type: String, required: true },
	incorrectAnswers: { type: [String], required: true },
});

const QuizSchema = new Schema({
	roomCode: { type: String, required: true, unique: true },
	title: { type: String, required: true },
	description: { type: String },
	imageUrl: { type: String, required: true },
	category: { type: Schema.Types.ObjectId, ref: "Category" },
	quizItems: { type: [quizItemSchema], required: true },
	isActive: { type: Boolean, default: false },
	createdBy: { type: Schema.Types.ObjectId, ref: "User" },
	createdAt: { type: Date, default: Date.now },
});

const Quiz = models.Quiz || model("Quiz", QuizSchema);

export default Quiz;
