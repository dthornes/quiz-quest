"use client";

import { useContext, useEffect } from "react";
import PlayerNameBanner from "@/components/shared/PlayerNameBanner";
import { SocketsContext } from "@/context/SocketsContext";
import { QuizContext } from "@/context/QuizContext";

const Joining = () => {
	const { socket } = useContext(SocketsContext);
	const { setPlayerScreen } = useContext(QuizContext);

	useEffect(() => {
		socket.on("start_quiz", () => {
			setPlayerScreen("loading");
		});
	}, []);

	return (
		<div className="m-auto text-center text-white">
			<h1 className="h1-bold">You're In!</h1>
			<p className="p-bold-20">See your nickname below</p>

			<PlayerNameBanner />
		</div>
	);
};

export default Joining;
