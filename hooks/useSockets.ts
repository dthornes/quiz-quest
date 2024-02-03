import { SocketsContext } from "@/context/SocketsContext";
import { setQuizActiveStatus } from "@/lib/actions/quiz.actions";
import { useState, useEffect, useContext } from "react";

type useSocketsParams = {
	userId: string;
	quizId: string;
};

const useSockets = ({ userId, quizId }: useSocketsParams) => {
	const { socket } = useContext(SocketsContext);

	const [player, setPlayer] = useState("");
	const [players, setPlayers] = useState([]);

	const startQuiz = async () => {
		await setQuizActiveStatus({ userId, quizId, isActive: true });
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
			socket.emit("add_player", { quizId, name: player });
		}
	}, [player]);

	return { socket, player, setPlayer, players };
};

export default useSockets;
