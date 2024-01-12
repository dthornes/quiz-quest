import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

type JoiningScreenProps = {
	setPlayer: React.Dispatch<React.SetStateAction<string>>;
	players: string[];
};

const JoiningScreen = ({ setPlayer, players }: JoiningScreenProps) => {
	const [playerName, setPlayerName] = useState("");

	return (
		<div className="bg-orange-400 flex flex-1">
			<div className="wrapper flex flex-1 flex-col">
				<div className="flex-1 grid grid-cols-6 py-10 place-items-center">
					{players?.map((player) => (
						<div key={player} className="text-white">
							{/* Player icon here */}
							{player}
						</div>
					))}
				</div>

				<div className="flex mt-auto mb-11 gap-2 w-full">
					<Input
						placeholder="Enter your name..."
						className="input-field flex-1"
						onChange={(e) => setPlayerName(e.target.value)}
					/>
					<Button className="button" onClick={() => setPlayer(playerName)}>
						Submit
					</Button>
				</div>
			</div>
		</div>
	);
};

export default JoiningScreen;
