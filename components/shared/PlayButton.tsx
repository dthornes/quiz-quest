"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { setQuizActiveStatus } from "@/lib/actions/quiz.actions";

type PlayButtonProps = {
	userId: string;
	quizId: string;
	isActive: boolean;
};

const PlayButton = ({ userId, quizId, isActive }: PlayButtonProps) => {
	const router = useRouter();

	const handlePlayButtonClick = () => {
		setQuizActiveStatus({ userId, quizId, isActive: true });
		router.push("/host/joining");
	};

	return (
		<Button className="button w-full" onClick={() => handlePlayButtonClick()}>
			Play
		</Button>
	);
};

export default PlayButton;
