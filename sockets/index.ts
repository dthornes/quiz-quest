require("./nodeconfig");

import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { ClientToServerEvents, ServerToClientEvents } from "./types";

import { getAllPlayersForQuiz } from "@/lib/actions/player.actions";
import {
	getActiveQuestionForQuiz,
	getQuizGamePin,
} from "@/lib/actions/quiz.actions";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { PlayerQuizQuestion } from "@/types";

const app = express();
app.use(cors());
const server = createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

const host = (
	socket: Socket<
		ClientToServerEvents,
		ServerToClientEvents,
		DefaultEventsMap,
		any
	>
) => {
	socket.on("host_screen", ({ quizId }) => {
		// Determine what screen host is on...
		io.to(quizId).emit("host_screen", "joining");
	});

	socket.on("game_pin", async ({ quizId }) => {
		const gamePin = await getQuizGamePin(quizId);

		io.to(quizId).emit("game_pin", gamePin);
	});

	socket.on("players", async ({ quizId }) => {
		const players = await getAllPlayersForQuiz(quizId);

		io.to(quizId).emit("players", players);
	});

	socket.on("start_quiz", ({ quizId }) => {
		// Determine what screen host is on...
		io.to(quizId).emit("host_screen", "question");
	});

	socket.on("quiz_question", async ({ quizId }) => {
		const question = (await getActiveQuestionForQuiz(
			quizId
		)) as PlayerQuizQuestion;

		io.to(quizId).emit("quiz_question", question);
	});
};

io.on("connection", (socket) => {
	socket.on("join_room", ({ quizId }) => {
		console.log("A player has joined quiz: ", quizId);

		socket.join(quizId);
	});

	host(socket);

	socket.on("add_player", async ({ quizId, player }) => {
		console.log(`Player ${player.name} has joined room ${quizId}`);

		const players = await getAllPlayersForQuiz(quizId);

		io.emit("player_list", players);
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
