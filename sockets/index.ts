require("./nodeconfig");

import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { ClientToServerEvents, ServerToClientEvents } from "./types";

import {
	getAllPlayersForQuiz,
	getOrCreatePlayer,
} from "@/lib/actions/player.actions";

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
		console.log(quizId, name);
		const player = await getOrCreatePlayer({ quizId, name });

		socket.join(player.quizId);

		console.log(`Player ${player.name} has joined room ${quizId}`);

		const players = await getAllPlayersForQuiz(quizId);

		io.emit("player_list", players);
	});

	socket.on("confirm_players", ({ quizId }) => {
		io.to(quizId).emit("screen", "quiz");
		io.to(quizId).emit("start_quiz");
	});

	socket.on("reset_quiz", ({ quizId }) => {
		io.to(quizId).emit("screen", "joining");
	});

	socket.on("get_question", ({ quizId, activeQuestion }) => {
		// TODO: Handle active questions better
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
