import { SearchParamProps } from "@/types";
import { getActiveQuestionForQuiz } from "@/lib/actions/quiz.actions";
import Answers from "@/components/player/quiz/Answers";

const Question = () => {
	// pass active question down...

	return (
		<Answers
			quizId={params.id}
			question={activeQuestion.question}
			answers={activeQuestion.answers}
		/>
	);
};

export default Question;
