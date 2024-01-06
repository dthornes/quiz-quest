import * as z from "zod";

export const quizFormSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters"),
	description: z
		.string()
		.min(3, "Description must be at least 3 characters")
		.max(400, "Description must be less than 400 characters"),
	imageUrl: z.string(),
	categoryId: z.string(),
	quizItems: z.array(
		z.object({
			question: z.string(),
			correctAnswer: z.string(),
			incorrectAnswers: z.array(z.string()),
		})
	),
});

export type QuizFormSchemaProps = z.infer<typeof quizFormSchema>;
