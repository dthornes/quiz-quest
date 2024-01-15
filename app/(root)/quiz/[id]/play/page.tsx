"use client";

import Joining from "@/components/quiz/Joining";
import useSockets from "@/hooks/useSockets";
import Quiz from "@/components/quiz/Quiz";
import Leaderboard from "@/components/quiz/Leaderboard";

type PlayQuizProps = {
	params: {
		id: string;
	};
};

const PlayQuiz = ({ params: { id } }: PlayQuizProps) => {
	const socket = useSockets({ roomId: id });

	const screen = {
		joining: <Joining {...socket} roomId={id} />,
		quiz: <Quiz />,
		leaderboard: <Leaderboard />,
	};

	return <div className="h-full flex">{screen[socket.currentScreen]}</div>;
};

export default PlayQuiz;
