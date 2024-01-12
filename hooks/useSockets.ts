import { useState, useEffect } from "react";
import { io } from "socket.io-client";

type useSocketsParams = {
	roomId: string;
};

const socket = io("http://localhost:3001");

const useSockets = ({ roomId }: useSocketsParams) => {
	const [player, setPlayer] = useState("");
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		socket.on("player_list", (players) => {
			setPlayers(players);
		});

		// TODO: Doesnt work in useHook
		// return () => {
		// 	socket.disconnect();
		// };
	}, []);

	useEffect(() => {
		if (player) {
			socket.emit("add_player", { roomId, player });
		}
	}, [player]);

	return { player, setPlayer, players };
};

export default useSockets;
