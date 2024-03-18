import { getAPIQuestions } from "@/lib/actions/question.actions";
import { QuizFormSchemaProps } from "@/lib/validator";
import React from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Button } from "../ui/button";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

type QuizQuestionsProps = {
	form: UseFormReturn<QuizFormSchemaProps, any, undefined>;
};

const QuizQuestions = ({ form }: QuizQuestionsProps) => {
	const { control } = form;

	const { fields, append, remove } = useFieldArray({
		control,
		name: "quizItems",
	});

	const generateQuestions = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
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
				<div
					key={question.id}
					className="p-3 rounded-lg border-slate-300 border-2"
				>
					<h2 className="text-lg font-bold mb-2">Question {index + 1}</h2>
					<FormField
						control={control}
						name={`quizItems.${index}.question`}
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
							control={control}
							name={`quizItems.${index}.correctAnswer`}
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormControl>
										<Input
											placeholder="Answer"
											{...field}
											className="input-field input-field-success"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{question.incorrectAnswers.map((incorrectAnswer, answerIndex) => (
							<FormField
								key={incorrectAnswer}
								control={control}
								name={`quizItems.${index}.incorrectAnswers.${answerIndex}`}
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
