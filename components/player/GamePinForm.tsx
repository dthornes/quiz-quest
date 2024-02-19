"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GamePinFormSchemaProps, gamePinFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { getQuizByGamePin } from "@/lib/actions/quiz.actions";

const GamePinForm = () => {
	const router = useRouter();

	const form = useForm<GamePinFormSchemaProps>({
		resolver: zodResolver(gamePinFormSchema),
	});

	async function onSubmit(values: GamePinFormSchemaProps) {
		const quiz = await getQuizByGamePin(values.gamePin);

		if (!quiz) {
			form.setError("gamePin", { message: "Incorrect game pin!" });
			return;
		}

		router.push(`/player/${quiz._id}`);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="gamePin"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl>
								<Input
									placeholder="Game PIN"
									{...field}
									className="input-field"
									type="number"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full">
					Enter
				</Button>
			</form>
		</Form>
	);
};

export default GamePinForm;
