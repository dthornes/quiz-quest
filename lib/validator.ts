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

export const gamePinFormSchema = z.object({
	gamePin: z
		.string()
		.min(6, "PIN must be 6 characters")
		.max(6, "PIN must be 6 characters"),
});

export const nicknameFormSchema = z.object({
	nickname: z
		.string()
		.min(3, "Nickname must be more than 3 characters")
		.max(12, "Nickname cannot be more that 12 characters"),
});

export type QuizFormSchemaProps = z.infer<typeof quizFormSchema>;
export type GamePinFormSchemaProps = z.infer<typeof gamePinFormSchema>;
export type NicknameFormSchemaProps = z.infer<typeof nicknameFormSchema>;
