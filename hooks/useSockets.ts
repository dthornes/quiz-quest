import { SocketsContext } from "@/context/SocketsContext";
import { setQuizActiveStatus } from "@/lib/actions/quiz.actions";
import { useState, useEffect, useContext } from "react";

type useSocketsParams = {
	userId: string;
	roomId: string;
};

const useSockets = ({ userId, roomId }: useSocketsParams) => {
	const { socket } = useContext(SocketsContext);

	const [player, setPlayer] = useState("");
	const [players, setPlayers] = useState([]);

	const startQuiz = async () => {
		await setQuizActiveStatus({ userId, quizId: roomId, isActive: true });
	};

	useEffect(() => {
		socket.on("player_list", (players) => {
			setPlayers(players);
		});

		socket.on("start_quiz", () => {
			startQuiz();
		});
	}, []);

	useEffect(() => {
		if (player) {
			socket.emit("add_player", { roomId, player });
		}
	}, [player]);

	return { socket, player, setPlayer, players };
};

export default useSockets;
