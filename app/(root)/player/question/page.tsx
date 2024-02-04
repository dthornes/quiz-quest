"use client";

import { useState } from "react";
import AnswersBlock from "@/components/shared/AnswersBlock";

const Question = () => {
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

	return (
		<AnswersBlock
			selectedAnswer={selectedAnswer}
			setSelectedAnswer={setSelectedAnswer}
		/>
	);
};

export default Question;
