"use client";

import { Dispatch, SetStateAction } from "react";
import Answer from "./Answer";

type AnswersBlockProps = {
	selectedAnswer?: string | null;
	setSelectedAnswer?: Dispatch<SetStateAction<string | null>>;
};

const AnswersBlock = ({
	selectedAnswer,
	setSelectedAnswer,
}: AnswersBlockProps) => {
	return (
		<div className="flex-1 px-3 grid grid-cols-2 gap-3">
			<Answer
				selectedAnswer={selectedAnswer}
				setSelectedAnswer={setSelectedAnswer}
				colour="blue"
				value="Answer 1"
			/>
			<Answer
				selectedAnswer={selectedAnswer}
				setSelectedAnswer={setSelectedAnswer}
				colour="red"
				value="Answer 2"
			/>
			<Answer
				selectedAnswer={selectedAnswer}
				setSelectedAnswer={setSelectedAnswer}
				colour="yellow"
				value="Answer 3"
			/>
			<Answer
				selectedAnswer={selectedAnswer}
				setSelectedAnswer={setSelectedAnswer}
				colour="green"
				value="Answer 4"
			/>
		</div>
	);
};

export default AnswersBlock;
