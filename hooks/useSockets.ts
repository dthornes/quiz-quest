import { WebsocketsContext } from "@/context/WebsocketsContext";
import { useState, useEffect, useContext } from "react";

type useSocketsParams = {
	roomId: string;
};

type currentSreen = "joining" | "quiz" | "leaderboard";

const useSockets = ({ roomId }: useSocketsParams) => {
	const { socket } = useContext(WebsocketsContext);
	const [currentScreen, setCurrentScreen] = useState<currentSreen>("joining");
	const [player, setPlayer] = useState("");
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		socket.on("player_list", (players) => {
			setPlayers(players);
		});

		socket.on("start_quiz", () => {
			setCurrentScreen("quiz");
		});
	}, []);

	useEffect(() => {
		if (player) {
			socket.emit("add_player", { roomId, player });
		}
	}, [player]);

	return { player, setPlayer, players, currentScreen };
};

export default useSockets;
