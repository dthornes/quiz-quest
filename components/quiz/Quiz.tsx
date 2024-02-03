import React, { useContext, useEffect, useState } from "react";
import { IQuiz } from "@/lib/database/models/quiz.model";
import { Button } from "../ui/button";
import { SignedIn } from "@clerk/nextjs";
import { setQuizActiveStatus } from "@/lib/actions/quiz.actions";
import { SocketsContext } from "@/context/SocketsContext";

type QuizProps = {
	userId: string;
	quizId: string;
	quizItems: IQuiz["quizItems"];
};

const Quiz = ({ userId, quizId, quizItems }: QuizProps) => {
	const { socket } = useContext(SocketsContext);
	const [activeQuestion, setActiveQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState("");

	useEffect(() => {
		socket.on("set_question", (activeQuestion) => {
			setActiveQuestion(activeQuestion);
		});
	}, []);

	useEffect(() => {
		socket.emit("answer_question", { userId, quizId, selectedAnswer });
	}, [selectedAnswer]);

	const resetQuiz = async () => {
		await setQuizActiveStatus({ userId, quizId, isActive: false });
		socket.emit("reset_quiz");
	};

	const nextQuestion = () => {
		socket.emit("get_question", { quizId, activeQuestion });
	};

	const buttonColour = () => {
		return [
			"bg-red-600 hover:bg-red-400",
			"bg-blue-600 hover:bg-blue-400",
			"bg-green-600 hover:bg-green-400",
			"bg-purple-600 hover:bg-purple-400",
		];
	};

	const quizItem = quizItems[activeQuestion];

	return (
		<>
			<div className="wrapper my-8 flex gap-5 flex-col">
				<h2 className="text-white h2-bold">{quizItem.question}</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					{[...quizItem.incorrectAnswers, quizItem.correctAnswer].map(
						(answer, index) => (
							<Button
								key={index}
								size="lg"
								className={`button-lg border-4 border-transparent ${
									buttonColour()[index]
								}
									${selectedAnswer === answer && "border-white"}
						`}
								onClick={() => setSelectedAnswer(answer)}
							>
								{answer}
							</Button>
						)
					)}
				</div>

				<SignedIn>
					<Button
						className="button-lg"
						size="lg"
						variant="secondary"
						onClick={() => nextQuestion()}
					>
						Next Question
					</Button>

					<Button
						className="button-lg"
						size="lg"
						variant="secondary"
						onClick={() => resetQuiz()}
					>
						Go back to joining
					</Button>
				</SignedIn>
			</div>
		</>
	);
};

export default Quiz;
