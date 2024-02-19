import QuestionAndAnswers from "@/components/host/QuestionAndAnswers";
import { QuizContext } from "@/context/QuizContext";
import { useContext } from "react";
import { Button } from "../ui/button";
import { SocketsContext } from "@/context/SocketsContext";
import Loading from "../player/quiz/Loader";

const Question = () => {
	const { socket } = useContext(SocketsContext);
	const { quizId, activeQuestion } = useContext(QuizContext);

	if (!activeQuestion) {
		return <Loading />;
	}

	return (
		<div className="w-full text-center relative pt-[124px] grid">
			<div className="animate-align-to-top absolute w-full">
				<div className="bg-white py-3 border-b-4 border-b-slate-200 flex flex-1 items-center">
					<h1 className="h1-bold  w-full">{activeQuestion.question}</h1>
				</div>
			</div>
			<div className="absolute right-2 top-[200px]">
				<Button
					variant="secondary"
					onClick={() => socket.emit("get_question", { quizId: quizId })}
				>
					Next
				</Button>
			</div>

			<QuestionAndAnswers answers={activeQuestion.answers} />
		</div>
	);
};

export default Question;
