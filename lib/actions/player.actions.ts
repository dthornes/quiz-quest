"use server";

import { connectToDatabase } from "@/lib/database";
import Player from "@/lib/database/models/player.model";
import { CreatePlayerParams } from "@/types";

export async function getOrCreatePlayer(player: CreatePlayerParams) {
	await connectToDatabase();

	let dbPlayer = await Player.findOne(player);

	if (!dbPlayer) {
		dbPlayer = await Player.create(player);
	}

	return JSON.parse(JSON.stringify(dbPlayer));
}
