"use client";

import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { QuizContext } from "@/context/QuizContext";
import { SocketsContext } from "@/context/SocketsContext";
import { useRouter } from "next/navigation";
import { getAllPlayersForQuiz } from "@/lib/actions/player.actions";

const Joining = () => {
	const { socket } = useContext(SocketsContext);
	const { quizId, gamePin, players } = useContext(QuizContext);

	return (
		<div className="flex flex-col flex-initial md:w-[900px]">
			<div className="bg-white p-3 rounded-sm">
				<h2 className="font-bold">Game PIN:</h2>
				<h1 className="h1-bold">{gamePin}</h1>
			</div>

			<div className="flex flex-1 justify-center items-center">
				<div className="flex flex-wrap justify-around gap-3">
					{!players.length && (
						<div className="w-full bg-orange-500 rounded-sm text-white">
							<p className="font-bold text-[34px] p-3">
								Waiting for players...
							</p>
						</div>
					)}

					{players.map((player) => (
						<div className="w-full bg-orange-500 rounded-sm md:w-[154px] text-white text-center">
							<p className="font-bold text-[34px] p-3">{player}</p>
						</div>
					))}
				</div>
			</div>

			<Button size="lg" onClick={() => socket.emit("start_quiz", { quizId })}>
				Start
			</Button>
		</div>
	);
};

export default Joining;
