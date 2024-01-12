"use client";

import React, { useEffect, useState } from "react";
import JoiningScreen from "@/components/shared/JoiningScreen";
import useSockets from "@/hooks/useSockets";

type PlayQuizProps = {
	params: {
		id: string;
	};
};

const PlayQuiz = ({ params: { id } }: PlayQuizProps) => {
	const { player, setPlayer, players } = useSockets({ roomId: id });

	return (
		<div className="h-full flex">
			<JoiningScreen setPlayer={setPlayer} players={players} />
		</div>
	);
};

export default PlayQuiz;
