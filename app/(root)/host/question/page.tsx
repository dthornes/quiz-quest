"use client";

import { useEffect, useState } from "react";
import Graph from "@/components/shared/Graph";
import Answer from "@/components/shared/Answer";
import AnswersBlock from "@/components/shared/AnswersBlock";

const Question = () => {
	const [showAnswers, setShowAnswers] = useState(false);
	const [timer, setTimer] = useState(10);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

	useEffect(() => {
		setTimeout(() => {
			setShowAnswers(true);
		}, 5000);
	}, []);

	useEffect(() => {
		if (showAnswers) {
			if (timer === 0) {
				if (selectedAnswer === null) {
					setSelectedAnswer("");
				}
				return;
			}

			const intervalId = setInterval(() => {
				setTimer((prevSeconds) => prevSeconds - 1);
			}, 1000);

			return () => clearInterval(intervalId);
		}
	}, [showAnswers, timer]);

	return (
		<div className="w-full text-center relative pt-[124px] grid">
			<div className="animate-align-to-top absolute w-full">
				<div className="bg-white border-b-4 border-b-slate-200 flex flex-1 items-center h-[124px]">
					<h1 className="h1-bold  w-full">Question Here...</h1>
				</div>
			</div>

			{showAnswers && (
				<>
					<div className="flex justify-center items-center pt-10">
						{/* Timer get from server */}
						{timer !== 0 && (
							<>
								<div className="bg-orange-600 rounded-full h-[104px] w-[104px] flex justify-center items-center text-white p-bold-24 absolute left-2 max-w-lg">
									{timer}
								</div>

								<p className="p-bold-24 text-white">Media here...</p>
							</>
						)}

						{timer === 0 && <Graph />}
					</div>

					<AnswersBlock
						selectedAnswer={selectedAnswer}
						setSelectedAnswer={setSelectedAnswer}
					/>
				</>
			)}
		</div>
	);
};

export default Question;
