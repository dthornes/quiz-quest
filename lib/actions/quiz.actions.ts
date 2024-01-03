"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import Quiz from "@/lib/database/models/quiz.model";
import User from "@/lib/database/models/user.model";
import Category from "@/lib/database/models/category.model";

import {
	CreateQuizParams,
	UpdateEventParams,
	DeleteEventParams,
	GetAllEventsParams,
	GetEventsByUserParams,
	GetRelatedEventsByCategoryParams,
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

// GET ONE EVENT BY ID
export async function getQuizById(eventId: string) {
	await connectToDatabase();

	const event = await populateEvent(Quiz.findById(eventId));

	if (!event) throw new Error("Quiz not found");

	return JSON.parse(JSON.stringify(event));
}

// UPDATE
export async function updateEvent({ userId, event, path }: UpdateEventParams) {
	await connectToDatabase();

	const eventToUpdate = await Event.findById(event._id);
	if (!eventToUpdate || eventToUpdate.organiser.toHexString() !== userId) {
		throw new Error("Unauthorized or event not found");
	}

	const updatedEvent = await Event.findByIdAndUpdate(
		event._id,
		{ ...event, category: event.categoryId },
		{ new: true }
	);
	revalidatePath(path);

	return JSON.parse(JSON.stringify(updatedEvent));
}

// DELETE
export async function deleteEvent({ eventId, path }: DeleteEventParams) {
	await connectToDatabase();

	const deletedEvent = await Event.findByIdAndDelete(eventId);
	if (deletedEvent) revalidatePath(path);
}

// CONVERTED
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
	const eventsQuery = Quiz.find(conditions)
		.sort({ createdAt: "desc" })
		.skip(skipAmount)
		.limit(limit);

	const events = await populateEvent(eventsQuery);
	const quizCount = await Quiz.countDocuments(conditions);

	return {
		data: JSON.parse(JSON.stringify(events)),
		totalPages: Math.ceil(quizCount / limit),
	};
}

// GET EVENTS BY organiser
export async function getEventsByUser({
	userId,
	limit = 6,
	page,
}: GetEventsByUserParams) {
	await connectToDatabase();

	const conditions = { organiser: userId };
	const skipAmount = (page - 1) * limit;

	const eventsQuery = Event.find(conditions)
		.sort({ createdAt: "desc" })
		.skip(skipAmount)
		.limit(limit);

	const events = await populateEvent(eventsQuery);
	const eventsCount = await Event.countDocuments(conditions);

	return {
		data: JSON.parse(JSON.stringify(events)),
		totalPages: Math.ceil(eventsCount / limit),
	};
}

// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
export async function getRelatedEventsByCategory({
	categoryId,
	eventId,
	limit = 3,
	page = 1,
}: GetRelatedEventsByCategoryParams) {
	await connectToDatabase();

	const skipAmount = (Number(page) - 1) * limit;
	const conditions = {
		$and: [{ category: categoryId }, { _id: { $ne: eventId } }],
	};

	const eventsQuery = Event.find(conditions)
		.sort({ createdAt: "desc" })
		.skip(skipAmount)
		.limit(limit);

	const events = await populateEvent(eventsQuery);
	const eventsCount = await Event.countDocuments(conditions);

	return {
		data: JSON.parse(JSON.stringify(events)),
		totalPages: Math.ceil(eventsCount / limit),
	};
}
