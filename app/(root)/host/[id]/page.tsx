"use client";

import React, { useContext } from "react";
import { QuizContext } from "@/context/QuizContext";
import Joining from "@/components/host/Joining";
import Question from "@/components/host/Question";
import Scoreboard from "@/components/host/Scoreboard";

const PlayerQuiz = () => {
	const { hostScreen } = useContext(QuizContext);

	const screen = {
		joining: <Joining />,
		question: <Question />,
		scoreboard: <Scoreboard />,
	};

	return <>{screen[hostScreen]}</>;
};

export default PlayerQuiz;
