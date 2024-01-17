"use client";

import Joining from "@/components/quiz/Joining";
import useSockets from "@/hooks/useSockets";
import Quiz from "@/components/quiz/Quiz";
import Leaderboard from "@/components/quiz/Leaderboard";
import { useEffect, useState } from "react";
import { getQuizById } from "@/lib/actions/quiz.actions";
import { IQuiz } from "@/lib/database/models/quiz.model";
import Loader from "./Loader";

type ScreensProps = {
	roomId: string;
	userId: string;
};

type CurrentSreen = "loading" | "joining" | "quiz" | "leaderboard";

const Screens = ({ userId, roomId }: ScreensProps) => {
	const socket = useSockets({ userId, roomId });
	const [currentScreen, setCurrentScreen] = useState<CurrentSreen>("loading");
	const [quiz, setQuiz] = useState<IQuiz | null>(null);

	useEffect(() => {
		socket.socket.on("screen", (screen) => {
			setCurrentScreen(screen);
		});
	}, []);

	useEffect(() => {
		const fetchQuiz = async () => {
			const quiz = (await getQuizById(roomId)) as IQuiz;

			setQuiz(quiz);
		};

		fetchQuiz();
	}, [roomId]);

	useEffect(() => {
		if (quiz) {
			if (!quiz?.isActive) {
				setCurrentScreen("joining");
			}

			if (quiz?.isActive) {
				setCurrentScreen("quiz");
			}
		}
	}, [quiz]);

	const screen = {
		loading: <Loader />,
		joining: <Joining {...socket} roomId={roomId} />,
		quiz: (
			<Quiz
				{...socket}
				quizItems={quiz?.quizItems}
				userId={userId}
				roomId={roomId}
			/>
		),
		leaderboard: <Leaderboard />,
	};

	return (
		<div className="h-full flex">
			<div className="bg-orange-400 flex flex-1">
				<div className="wrapper flex flex-1 flex-col">
					{screen[currentScreen]}
				</div>
			</div>
		</div>
	);
};

export default Screens;
