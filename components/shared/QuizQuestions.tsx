import React from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { getAPIQuestions } from "@/lib/actions/question.actions";
import { QuizQuestionsProps } from "@/types";

const QuizQuestions = ({ form }) => {
	const { control, register } = form;
	// use generic to pass shit here
	const { fields, append, remove } = useFieldArray({
		control,
		name: "quizItems",
	});

	const generateQuestions = async (
		e: MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		const questions = await getAPIQuestions();

		append(questions);
	};

	return (
		<>
			<Button
				size="lg"
				className="button col-span-2 w-full bg-primary-50 hover:bg-gray-300 text-gray-600 border-2 border-gray-300"
				onClick={(e) => generateQuestions(e)}
			>
				Generate Questions
			</Button>

			{fields?.map((question, index) => (
				<div key={question.id} className="bg-primary-500 p-3 rounded-lg">
					<FormField
						control={form.control}
						name={`quizItems[${index}].question`}
						render={({ field }) => (
							<FormItem className="flex-1 mb-5">
								<FormControl>
									<Input
										placeholder={`Question ${index}`}
										{...field}
										className="input-field"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex gap-3 justify-between">
						<FormField
							control={form.control}
							name={`quizItems[${index}].correctAnswer`}
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormControl>
										<Input
											placeholder="Answer"
											{...field}
											className="input-field"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{question.incorrectAnswers.map((incorrectAnswer, answerIndex) => (
							<FormField
								key={incorrectAnswer}
								control={form.control}
								name={`quizItems[${index}].incorrectAnswer[${answerIndex}]`}
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormControl>
											<Input
												placeholder="Answer"
												{...field}
												className="input-field"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						))}
					</div>
				</div>
			))}
		</>
	);
};

export default QuizQuestions;
