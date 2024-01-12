"use client";

import React, { useEffect, useState } from "react";
import { getQuizById } from "@/lib/actions/quiz.actions";
import HeaderBanner from "@/components/shared/HeaderBanner";
import { Button } from "@/components/ui/button";
import { IQuiz } from "@/lib/database/models/quiz.model";

type PlayQuizProps = {
	params: {
		id: string;
	};
};

const PlayQuiz = ({ params: { id } }: PlayQuizProps) => {
	const [quiz, setQuiz] = useState<IQuiz | null>(null);
	const [activeQuestion, setActiveQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState("");

	useEffect(() => {
		const fetchQuiz = async () => {
			const quiz = (await getQuizById(id)) as IQuiz;

			setQuiz(quiz);
		};

		fetchQuiz();
	}, [id]);

	if (!quiz) {
		return <p>Loading</p>;
	}

	const quizItem = quiz.quizItems[activeQuestion];

	return (
		<>
			<HeaderBanner text={quiz.title} />

			<div className="wrapper my-8 flex gap-5 flex-col">
				<h2>{quizItem.question}</h2>

				<div className="grid grid-cols-2 gap-3">
					{[...quizItem.incorrectAnswers, quizItem.correctAnswer].map(
						(answer, index) => (
							<Button
								key={index}
								size="lg"
								className={`
									${selectedAnswer === answer && "bg-green-500 hover:bg-green"}
								`}
								onClick={() => setSelectedAnswer(answer)}
							>
								{answer}
							</Button>
						)
					)}
				</div>

				<Button className="w-full button">Submit</Button>
			</div>
		</>
	);
};

export default PlayQuiz;
