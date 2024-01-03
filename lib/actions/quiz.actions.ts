"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import Quiz from "@/lib/database/models/quiz.model";
import User from "@/lib/database/models/user.model";
import Category from "@/lib/database/models/category.model";

import {
	CreateQuizParams,
	GetAllEventsParams,
	UpdateQuizParams,
	DeleteQuizParams,
	GetQuizzesByUserParams,
} from "@/types";

const getCategoryByName = async (name: string) => {
	return Category.findOne({ name: { $regex: name, $options: "i" } });
};

const populateEvent = (query: any) => {
	return query
		.populate({
			path: "organiser",
			model: User,
			select: "_id firstName lastName",
		})
		.populate({ path: "category", model: Category, select: "_id name" });
};

export async function createQuiz({ userId, quiz, path }: CreateQuizParams) {
	await connectToDatabase();

	const user = await User.findById(userId);
	if (!user) throw new Error("User not found");

	const newQuiz = await Quiz.create({
		...quiz,
		category: quiz.categoryId,
		createdBy: userId,
		createdAt: Date.now(),
	});
	revalidatePath(path);

	return JSON.parse(JSON.stringify(newQuiz));
}

export async function getQuizById(quizId: string) {
	await connectToDatabase();

	const quiz = await populateEvent(Quiz.findById(quizId));

	if (!quiz) throw new Error("Quiz not found");

	return JSON.parse(JSON.stringify(quiz));
}

export async function updateQuiz({ userId, quiz, path }: UpdateQuizParams) {
	await connectToDatabase();

	const quizToUpdate = await Quiz.findById(quiz._id);
	if (!quizToUpdate || quizToUpdate.createdBy.toHexString() !== userId) {
		throw new Error("Unauthorized or quiz not found");
	}

	const updatedQuiz = await Quiz.findByIdAndUpdate(
		quiz._id,
		{ ...quiz, category: quiz.categoryId },
		{ new: true }
	);
	revalidatePath(path);

	return JSON.parse(JSON.stringify(updatedQuiz));
}

export async function deleteQuiz({ quizId, path }: DeleteQuizParams) {
	await connectToDatabase();

	const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
	if (deletedQuiz) revalidatePath(path);
}

export async function getAllQuizzes({
	query,
	limit = 6,
	page,
	category,
}: GetAllEventsParams) {
	await connectToDatabase();

	const titleCondition = query
		? { title: { $regex: query, $options: "i" } }
		: {};
	const categoryCondition = category ? await getCategoryByName(category) : null;
	const conditions = {
		$and: [
			titleCondition,
			categoryCondition ? { category: categoryCondition._id } : {},
		],
	};

	const skipAmount = (Number(page) - 1) * limit;
	const quizQuery = Quiz.find(conditions)
		.sort({ createdAt: "desc" })
		.skip(skipAmount)
		.limit(limit);

	const quizzes = await populateEvent(quizQuery);
	const quizCount = await Quiz.countDocuments(conditions);

	return {
		data: JSON.parse(JSON.stringify(quizzes)),
		totalPages: Math.ceil(quizCount / limit),
	};
}

export async function getQuizzesByUser({
	userId,
	limit = 6,
	page,
}: GetQuizzesByUserParams) {
	await connectToDatabase();

	const conditions = { createdBy: userId };
	const skipAmount = (page - 1) * limit;

	const quizQuery = Quiz.find(conditions)
		.sort({ createdAt: "desc" })
		.skip(skipAmount)
		.limit(limit);

	const quizzes = await populateEvent(quizQuery);
	const quizzesCount = await Quiz.countDocuments(conditions);

	return {
		data: JSON.parse(JSON.stringify(quizzes)),
		totalPages: Math.ceil(quizzesCount / limit),
	};
}
