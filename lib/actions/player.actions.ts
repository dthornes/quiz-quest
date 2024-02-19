"use server";

import { connectToDatabase } from "@/lib/database";
import Player from "@/lib/database/models/player.model";
import { CreatePlayerParams } from "@/types";
import Quiz from "../database/models/quiz.model";

export async function getOrCreatePlayer(player: CreatePlayerParams) {
	await connectToDatabase();

	let dbPlayer = await Player.findOne(player);

	if (!dbPlayer) {
		dbPlayer = await Player.create(player);
	}

	return JSON.parse(JSON.stringify(dbPlayer));
}

export async function getPlayerById(playerId: string) {
	await connectToDatabase();

	let player = await Player.findById(playerId);

	return JSON.parse(JSON.stringify(player));
}

export async function getAllPlayersForQuiz(quizId: string) {
	await connectToDatabase();

	const players = await Player.find({ quizId }).select("name");
	const names = players.map((player) => player.name);

	return JSON.parse(JSON.stringify(names));
}

export async function storeAnswerToPlayer({
	playerId,
	question,
	answer,
}: {
	playerId: string;
	question: string;
	answer: string;
}) {
	await connectToDatabase();

	const quiz = await Quiz.findOne(
		{ "quizItems.question": question },
		{ "quizItems.$": 1 }
	);

	const isCorrect = quiz.quizItems[0].correctAnswer === answer;

	const savedAnswer = await Player.findOneAndUpdate(
		{ _id: playerId, "quizAnswers.question": question },
		{ $set: { "quizAnswers.$.isCorrect": isCorrect } },
		{ new: true }
	);

	if (!savedAnswer) {
		await Player.findByIdAndUpdate(
			playerId,
			{ $push: { quizAnswers: { question, isCorrect } } },
			{ new: true }
		);
	}

	return JSON.parse(JSON.stringify({ isCorrect }));
}
