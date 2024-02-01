require("./nodeconfig");

import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { ClientToServerEvents, ServerToClientEvents } from "./types";

import { getOrCreatePlayer } from "@/lib/actions/player.actions";

const app = express();
app.use(cors());
const server = createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("A player connected:", socket.id);

	socket.on("add_player", async ({ quizId, name }) => {
		// TODO: get or create player
		const player = await getOrCreatePlayer({ quizId, name });

		socket.join(player.quizId);

		console.log(`Player ${player} has joined room ${quizId}`);

		// TODO: query all players and show here
		// io.emit("player_list", Object.values(connectedPlayers));
	});

	socket.on("confirm_players", ({ quizId }) => {
		io.to(quizId).emit("screen", "quiz");
		io.to(quizId).emit("start_quiz");
	});

	socket.on("reset_quiz", ({ quizId }) => {
		io.to(quizId).emit("screen", "joining");
	});

	socket.on("get_question", ({ quizId, activeQuestion }) => {
		console.log(activeQuestion + 1);
		// TODO: Handle active questions bettert
		io.to(quizId).emit("set_question", activeQuestion + 1);
	});

	socket.on("answer_question", ({ quizId }) => {
		// store answer for question
	});

	socket.on("disconnect", () => {
		// TODO: Delete user from DB
		console.log("A player disconnected:", socket.id);
	});
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
	console.log(`Socket.io server is running on port ${PORT}`);
});
