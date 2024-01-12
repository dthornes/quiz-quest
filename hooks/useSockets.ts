import { WebsocketsContext } from "@/context/WebsocketsContext";
import { useState, useEffect, useContext } from "react";

type useSocketsParams = {
	roomId: string;
};

const useSockets = ({ roomId }: useSocketsParams) => {
	const { socket } = useContext(WebsocketsContext);
	const [player, setPlayer] = useState("");
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		socket.on("player_list", (players) => {
			console.log("Player list", players);
			setPlayers(players);
		});

		// TODO: Doesnt work in useHook - too many connections
		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		if (player) {
			console.log("add_player");
			socket.emit("add_player", { roomId, player });
		}
	}, [player]);

	return { player, setPlayer, players };
};

export default useSockets;
