"use server";

import { QuizApiProps } from "@/types";

export const getAPIQuestions = async () => {
	const response = await fetch(process.env.QUIZ_API as string);
	const data = (await response.json()) as QuizApiProps[];

	return data.map((record) => ({
		question: record.question.text,
		correctAnswer: record.correctAnswer,
		incorrectAnswers: record.incorrectAnswers,
	}));
};
