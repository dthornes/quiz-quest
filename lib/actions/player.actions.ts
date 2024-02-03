"use server";

import { connectToDatabase } from "@/lib/database";
import Player from "@/lib/database/models/player.model";
import { CreatePlayerParams } from "@/types";
import jwt from "jsonwebtoken";

export async function getOrCreatePlayer(player: CreatePlayerParams) {
	await connectToDatabase();

	let dbPlayer = await Player.findOne(player);

	if (!dbPlayer) {
		dbPlayer = await Player.create(player);
	}

	// LOGIN MIGHT WORK!!!
	// const tokenData = dbPlayer;

	// // Create a token with expiration of 1 day
	// const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
	// 	expiresIn: "1d",
	// });

	// // Set the token as an HTTP-only cookie
	// response.cookies.set("token", token, {
	// 	httpOnly: true,
	// });

	// return response;

	return JSON.parse(JSON.stringify(dbPlayer));
}

export async function getAllPlayersForQuiz(quizId: string) {
	await connectToDatabase();

	const players = await Player.find({ quizId }).select("name");
	const names = players.map((player) => player.name);

	return JSON.parse(JSON.stringify(names));
}
