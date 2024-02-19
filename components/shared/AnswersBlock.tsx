"use client";

import { Dispatch, SetStateAction } from "react";
import Answer from "./Answer";

type AnswersBlockProps = {
	answers: string[];
	selectedAnswer?: string | null;
	setSelectedAnswer?: Dispatch<SetStateAction<string | null>>;
};

const AnswersBlock = ({
	answers,
	selectedAnswer,
	setSelectedAnswer,
}: AnswersBlockProps) => {
	return (
		<div className="flex-1 px-3 grid grid-cols-2 gap-3">
			<Answer
				selectedAnswer={selectedAnswer}
				setSelectedAnswer={setSelectedAnswer}
				colour="blue"
				value={answers[0]}
			/>
			<Answer
				selectedAnswer={selectedAnswer}
				setSelectedAnswer={setSelectedAnswer}
				colour="red"
				value={answers[1]}
			/>
			<Answer
				selectedAnswer={selectedAnswer}
				setSelectedAnswer={setSelectedAnswer}
				colour="yellow"
				value={answers[2]}
			/>
			<Answer
				selectedAnswer={selectedAnswer}
				setSelectedAnswer={setSelectedAnswer}
				colour="green"
				value={answers[3]}
			/>
		</div>
	);
};

export default AnswersBlock;
