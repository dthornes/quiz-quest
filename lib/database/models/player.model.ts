import { Schema, model, models } from "mongoose";

export interface IPlayer extends Document {
	_id: string;
	socketId: string;
	quizId: string;
	name: string;
	quizAnswers: QuizAnswers;
}

export type QuizAnswers = {
	_id: string;
	question: string;
	isCorrect: boolean;
};

const QuizAnswersSchema = new Schema({
	question: { type: String },
	isCorrect: { type: Boolean },
});

const PlayerSchema = new Schema({
	socketId: { type: String, required: true, unique: true },
	quizId: { type: Schema.Types.ObjectId, ref: "Quiz" },
	name: { type: String, required: true },
	quizAnswers: { type: QuizAnswersSchema },
});

const Player = models.Player || model("Player", PlayerSchema);

export default Player;
