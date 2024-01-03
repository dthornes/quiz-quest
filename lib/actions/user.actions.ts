"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import Quiz from "@/lib/database/models/quiz.model";

import { CreateUserParams, UpdateUserParams } from "@/types";

export async function createUser(user: CreateUserParams) {
	await connectToDatabase();

	const newUser = await User.create(user);
	return JSON.parse(JSON.stringify(newUser));
}

export async function getUserById(userId: string) {
	await connectToDatabase();

	const user = await User.findById(userId);

	if (!user) throw new Error("User not found");
	return JSON.parse(JSON.stringify(user));
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
	await connectToDatabase();

	const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
		new: true,
	});

	if (!updatedUser) throw new Error("User update failed");
	return JSON.parse(JSON.stringify(updatedUser));
}

export async function deleteUser(clerkId: string) {
	await connectToDatabase();

	// Find user to delete
	const userToDelete = await User.findOne({ clerkId });

	if (!userToDelete) {
		throw new Error("User not found");
	}

	// Unlink relationships
	await Promise.all([
		// Update the 'events' collection to remove references to the user
		Quiz.updateMany(
			{ _id: { $in: userToDelete.events } },
			{ $pull: { organiser: userToDelete._id } }
		),
	]);

	// Delete user
	const deletedUser = await User.findByIdAndDelete(userToDelete._id);
	revalidatePath("/");

	return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
}
