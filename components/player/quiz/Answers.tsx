"use client";

import React, { useEffect, useState } from "react";
import AnswersBlock from "../../shared/AnswersBlock";
import { storeAnswerToPlayer } from "@/lib/actions/player.actions";
import { useRouter } from "next/navigation";

type AnswerProps = {
	quizId: string;
	question: string;
	answers: string[];
};

const Answers = ({ quizId, question, answers }: AnswerProps) => {
	const router = useRouter();
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [isCorrect, setIsCorrect] = useState(false);

	useEffect(() => {
		if (selectedAnswer) {
			handleAddAnswer();
		}
	}, [selectedAnswer]);

	const handleAddAnswer = async () => {
		const playerId = localStorage.getItem("playerId");

		if (playerId && selectedAnswer) {
			const isCorrect = await storeAnswerToPlayer({
				playerId,
				question,
				answer: selectedAnswer,
			});

			setIsCorrect(isCorrect);

			// show whether correct or not...
			router.push(`/player/${quizId}/result`);
		}
	};

	return (
		<AnswersBlock
			answers={answers}
			selectedAnswer={selectedAnswer}
			setSelectedAnswer={setSelectedAnswer}
		/>
	);
};

export default Answers;
