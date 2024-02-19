"use client";

import Joining from "@/components/quiz/Joining";
import useSockets from "@/hooks/useSockets";
import Quiz from "@/components/quiz/Quiz";
import Leaderboard from "@/components/quiz/Leaderboard";
import { useEffect, useState } from "react";
import { getQuizById } from "@/lib/actions/quiz.actions";
import { IQuiz } from "@/lib/database/models/quiz.model";
import Loader from "../shared/Loader";

type ScreensProps = {
	quizId: string;
	userId: string;
};

type CurrentSreen = "loading" | "joining" | "quiz" | "leaderboard";

const Screens = ({ userId, quizId }: ScreensProps) => {
	const socket = useSockets({ userId, quizId });
	const [currentScreen, setCurrentScreen] = useState<CurrentSreen>("loading");
	const [quiz, setQuiz] = useState<IQuiz | null>(null);

	useEffect(() => {
		socket.socket.on("screen", (screen) => {
			setCurrentScreen(screen);
		});
	}, []);

	useEffect(() => {
		const fetchQuiz = async () => {
			const quiz = (await getQuizById(quizId)) as IQuiz;

			setQuiz(quiz);
		};

		fetchQuiz();
	}, [quizId]);

	useEffect(() => {
		if (quiz) {
			if (!quiz.isActive) {
				setCurrentScreen("joining");
			}

			if (quiz.isActive) {
				setCurrentScreen("quiz");
			}
		}
	}, [quiz]);

	const screen = {
		loading: <Loader />,
		joining: <Joining {...socket} quizId={quizId} />,
		quiz: quiz && (
			<Quiz
				{...socket}
				quizItems={quiz.quizItems}
				userId={userId}
				quizId={quizId}
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
