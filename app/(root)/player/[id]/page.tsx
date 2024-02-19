"use client";

import React, { useContext } from "react";
import Nickname from "@/components/player/welcome/Nickname";
import Joining from "@/components/player/welcome/Joining";
import Question from "@/components/player/quiz/Question";
import Result from "@/components/player/quiz/Result";
import Ranking from "@/components/player/quiz/Ranking";
import { QuizContext } from "@/context/QuizContext";
import Loading from "@/components/player/quiz/Loader";

const PlayerQuiz = () => {
	const { playerScreen } = useContext(QuizContext);

	const screen = {
		nickname: <Nickname />,
		joining: <Joining />,
		loading: <Loading />,
		question: <Question />,
		result: <Result />,
		ranking: <Ranking />,
	};

	return <>{screen[playerScreen]}</>;
};

export default PlayerQuiz;
