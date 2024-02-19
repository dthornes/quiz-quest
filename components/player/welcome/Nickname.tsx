"use client";

import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuizContext } from "@/context/QuizContext";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NicknameFormSchemaProps, nicknameFormSchema } from "@/lib/validator";
import { getOrCreatePlayer } from "@/lib/actions/player.actions";
import { SocketsContext } from "@/context/SocketsContext";

const Nickname = () => {
	const { quiz, setCurrentScreen } = useContext(QuizContext);
	const { socket } = useContext(SocketsContext);

	const form = useForm<NicknameFormSchemaProps>({
		resolver: zodResolver(nicknameFormSchema),
	});

	const onSubmit = async (values: NicknameFormSchemaProps) => {
		if (quiz) {
			const player = await getOrCreatePlayer({
				quizId: quiz._id,
				name: values.nickname,
			});

			localStorage.setItem("playerId", player._id);

			socket.emit("add_player", { quizId: quiz._id, player });

			setCurrentScreen("joining");
		}
	};

	return (
		<div className="bg-white p-3 rounded-sm md:w-[300px] m-auto">
			<h2 className="h2-bold">{quiz?.title}</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="nickname"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input
										placeholder="Nickname"
										{...field}
										className="input-field"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full">
						Go!
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default Nickname;
