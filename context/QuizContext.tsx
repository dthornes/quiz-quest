"use client";

import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useEffect,
	useState,
} from "react";

import { IQuiz } from "@/lib/database/models/quiz.model";
import {
	getQuizById,
	getActiveQuestionForQuiz,
} from "@/lib/actions/quiz.actions";
import { IPlayer } from "@/lib/database/models/player.model";
import {
	getOrCreatePlayer,
	getPlayerById,
	storeAnswerToPlayer,
} from "@/lib/actions/player.actions";
import { usePathname } from "next/navigation";
import { PlayerQuizQuestion } from "@/types";
import useHostQuiz from "@/hooks/useHostQuiz";

type PlayerScreen =
	| "loading"
	| "nickname"
	| "joining"
	| "question"
	| "result"
	| "ranking";

type HostScreen = "joining" | "question" | "scoreboard";

interface QuizContextProps {
	quizId: string;
	gamePin: string | null;
	playerScreen: PlayerScreen;
	hostScreen: HostScreen;
	players: string[];
	activeQuestion: PlayerQuizQuestion | null;
	player: IPlayer | null;
}

export const QuizContext = createContext<QuizContextProps>(
	null as unknown as QuizContextProps
);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const { quizId, hostScreen, gamePin, players, activeQuestion } =
		useHostQuiz();

	const pathname = usePathname();

	const [playerScreen, setPlayerScreen] = useState<PlayerScreen>("joining");

	const [player, setPlayer] = useState(null);

	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

	useEffect(() => {
		getPlayer();
	}, []);

	const handleAddAnswer = async () => {
		const playerId = localStorage.getItem("playerId");

		if (playerId && selectedAnswer) {
			const isCorrect = await storeAnswerToPlayer({
				playerId,
				question,
				answer: selectedAnswer,
			});

			setIsCorrect(isCorrect);

			// router redirect in useffect instead
			// router.push(`/player/${quizId}/result`);
		}
	};

	const getPlayer = async () => {
		const playerId = localStorage.getItem("playerId");

		if (playerId) {
			const player = await getPlayerById(playerId);

			setPlayer(player);
		}
	};

	return (
		<QuizContext.Provider
			value={{
				quizId,
				playerScreen,
				hostScreen,
				gamePin,
				players,
				activeQuestion,
				player,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};
