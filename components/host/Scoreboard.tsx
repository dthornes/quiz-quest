"use client";

import React, { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import clsx from "clsx";
import Image from "next/image";

type ScoreState = {
	name: string;
};

// TODO: Get from sockets
const oldRank = [{ name: "Dan" }, { name: "Bill" }, { name: "Rodger" }];

const newRank = [{ name: "Bill" }, { name: "Rodger" }, { name: "Dan" }];

const podiumIcons = [
	"/assets/icons/first-icon.svg",
	"/assets/icons/second-icon.svg",
	"/assets/icons/third-icon.svg",
];

const Scoreboard = () => {
	const [ranks, setRanks] = useState<ScoreState[]>(oldRank);
	const [isWinner, setIsWinner] = useState(false);
	const [parent] = useAutoAnimate();

	useEffect(() => {
		setTimeout(() => {
			setRanks(newRank);

			setTimeout(() => {
				setIsWinner(true);
			}, 1500);
		}, 1000);
	}, []);

	return (
		<div className="w-full max-w-[75%] flex flex-col items-center">
			<div className="bg-white text-center p-5 rounded-sm w-[280px]">
				<h2 className="h2-bold">Scoreboard</h2>
			</div>

			<div
				className="flex flex-col gap-3 w-full h-full justify-center"
				ref={parent}
			>
				{ranks.map((player, index) => (
					<div
						key={player.name}
						ref={parent}
						className={clsx(
							"grid bg-white rounded-sm p-5 p-bold-24 leading-[65px] border-4 border-transparent",
							isWinner ? "grid-cols-[60px_1fr_0fr]" : "grid-cols-[1fr_0fr]",
							isWinner && index === 0 && "animate-pulse-large border-slate-400"
						)}
					>
						{isWinner && (
							<Image
								src={podiumIcons[index]}
								alt="Leaderboard icon"
								width={40}
								height={40}
							/>
						)}
						<span>{player.name}</span>
						{/* TODO: Get score from websockets */}
						<span>0</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default Scoreboard;
