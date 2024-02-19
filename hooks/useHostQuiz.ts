import React, { useContext, useEffect, useState } from "react";
import { IQuiz } from "@/lib/database/models/quiz.model";
import { PlayerQuizQuestion } from "@/types";
import { SocketsContext } from "@/context/SocketsContext";
import { usePathname } from "next/navigation";

type HostScreen = "joining" | "question" | "scoreboard";

const quizIdFromUrl = () => {
	const pathname = usePathname();
	const lastIndex = pathname.lastIndexOf("/");

	return pathname.substring(lastIndex + 1);
};

const useHostQuiz = () => {
	const { socket } = useContext(SocketsContext);

	const [hostScreen, setHostScreen] = useState<HostScreen>("joining");
	const [players, setPlayers] = useState([]);
	const [gamePin, setGamePin] = useState<string | null>(null);
	const [activeQuestion, setActiveQuestion] =
		useState<PlayerQuizQuestion | null>(null);

	const quizId = quizIdFromUrl();

	useEffect(() => {
		socket.emit("join_room", { quizId });

		socket.emit("host_screen", { quizId });
		socket.on("host_screen", (screen) => {
			setHostScreen(screen);
		});

		socket.emit("game_pin", { quizId });
		socket.on("game_pin", (pin) => {
			setGamePin(pin);
		});

		socket.emit("players", { quizId });
		socket.on("players", (players) => {
			setPlayers(players);
		});

		socket.emit("quiz_question", { quizId });
		socket.on("quiz_question", (question) => {
			setActiveQuestion(question);
		});
	}, []);

	return { quizId, hostScreen, players, gamePin, activeQuestion };
};

export default useHostQuiz;
