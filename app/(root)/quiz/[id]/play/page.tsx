import Screens from "@/components/quiz/Screens";
import { auth } from "@clerk/nextjs";

type PlayQuizProps = {
	params: {
		id: string;
	};
};

const PlayQuiz = ({ params: { id } }: PlayQuizProps) => {
	const { sessionClaims } = auth();

	const userId = sessionClaims?.userId as string;

	return <Screens userId={userId} quizId={id} />;
};

export default PlayQuiz;
