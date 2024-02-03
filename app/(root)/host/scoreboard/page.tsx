import React from "react";

const players = [
	{ name: "Dan" },
	{ name: "The deathless" },
	{ name: "Alan Watts" },
];

// TODO: Animate the scoreboard
const Scoreboard = () => {
	return (
		<div className="w-full max-w-[75%] flex flex-col items-center">
			<div className="bg-white text-center p-5 rounded-sm w-[280px]">
				<h2 className="h2-bold">Scoreboard</h2>
			</div>

			<div className="flex flex-col gap-3 w-full h-full justify-center">
				{players.map((player) => (
					<div className="bg-white rounded-sm p-10 p-bold-24 flex justify-between">
						<span>{player.name}</span>
						<span>0</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default Scoreboard;
