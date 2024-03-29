import { QuizFormSchemaProps } from "@/lib/validator";

// ====== USER PARAMS
export type CreateUserParams = {
	clerkId: string;
	firstName: string;
	lastName: string;
	username: string;
	email: string;
	photo: string;
};

export type UpdateUserParams = {
	firstName: string;
	lastName: string;
	username: string;
	photo: string;
};

// ====== QUIZ PARAMS
export type CreateQuizParams = {
	userId: string;
	quiz: QuizFormSchemaProps;
	path: string;
};

export type UpdateQuizParams = {
	userId: string;
	quiz: {
		_id: string;
		title: string;
		description: string;
		imageUrl: string;
		categoryId: string;
	};
	path: string;
};

export type DeleteQuizParams = {
	quizId: string;
	path: string;
};

export type GetAllQuizzesParams = {
	query: string;
	category: string;
	limit: number;
	page: number;
};

export type GetQuizzesByUserParams = {
	userId: string;
	limit?: number;
	page: number;
};

export type GetRelatedQuizzesByCategoryParams = {
	categoryId: string;
	eventId: string;
	limit?: number;
	page: number | string;
};

export type SetQuizActive = {
	userId: string;
	quizId: string;
	isActive: boolean;
};

export type Quiz = {
	_id: string;
	title: string;
	description: string;
	imageUrl: string;
	url: string;
	createdAt: Date;
	createdBy: {
		_id: string;
		username: string;
	};
	category: {
		_id: string;
		name: string;
	};
};

export type PlayerQuizQuestion = {
	answers: string[];
	_id: string;
	question: string;
	isActive: boolean;
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
	categoryName: string;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
	params: string;
	key: string;
	value: string | null;
};

export type RemoveUrlQueryParams = {
	params: string;
	keysToRemove: string[];
};

export type SearchCollectionProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export type SearchParamProps = SearchCollectionProps & {
	params: { id: string };
};

// ====== QUIZ API PARAMS
export type QuizApiProps = {
	category: string;
	id: string;
	correctAnswer: string;
	incorrectAnswers: string[];
	question: {
		text: string;
	};
	tags: string[];
	type: string;
	difficulty: string;
	regions: string[];
	isNiche: boolean;
};

export type QuizQuestionsProps = {
	question: string;
	correctAnswer: string;
	incorrectAnswers: string[];
};

// ====== PLAYER PARAMS
export type CreatePlayerParams = {
	quizId: string;
	name: string;
};
