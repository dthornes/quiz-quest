"use client";

import { QuizContext } from "@/context/QuizContext";
import React, { useContext } from "react";

const PlayerNameBanner = () => {
	const { player } = useContext(QuizContext);

	return (
		<div className="flex justify-between fixed bottom-0 left-0 w-full bg-slate-400 p-5 text-left">
			<span className="p-bold-20 text-slate-800">{player?.name}</span>
			{/* TODO: Show score... */}
			<span className="bg-slate-800 rounded-sm py-1 px-3">100</span>
		</div>
	);
};

export default PlayerNameBanner;
