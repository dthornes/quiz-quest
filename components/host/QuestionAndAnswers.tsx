"use client";

import React, { useEffect, useState } from "react";
import Graph from "../shared/Graph";
import AnswersBlock from "../shared/AnswersBlock";

type QuestionAndAnswersProps = {
	answers: string[];
};

const QuestionAndAnswers = ({ answers }: QuestionAndAnswersProps) => {
	const [showAnswers, setShowAnswers] = useState(false);
	const [timer, setTimer] = useState(10);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

	useEffect(() => {
		setTimeout(() => {
			setShowAnswers(true);
		}, 5000);
	}, []);

	useEffect(() => {
		if (showAnswers) {
			if (timer === 0) {
				if (selectedAnswer === null) {
					setSelectedAnswer("");
				}
				return;
			}

			const intervalId = setInterval(() => {
				setTimer((prevSeconds) => prevSeconds - 1);
			}, 1000);

			return () => clearInterval(intervalId);
		}
	}, [showAnswers, timer]);

	return (
		showAnswers && (
			<>
				<div className="flex justify-center items-center pt-10">
					{/* Timer get from server */}
					{timer !== 0 && (
						<>
							<div className="bg-orange-600 rounded-full h-[104px] w-[104px] flex justify-center items-center text-white p-bold-24 absolute left-2 max-w-lg">
								{timer}
							</div>

							<p className="p-bold-24 text-white">Media here...</p>
						</>
					)}

					{timer === 0 && <Graph />}
				</div>

				<AnswersBlock
					answers={answers}
					selectedAnswer={selectedAnswer}
					setSelectedAnswer={setSelectedAnswer}
				/>
			</>
		)
	);
};

export default QuestionAndAnswers;
