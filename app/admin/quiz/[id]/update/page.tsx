import HeaderBanner from "@/components/shared/HeaderBanner";
import QuizForm from "@/components/shared/QuizForm";
import { getQuizById } from "@/lib/actions/quiz.actions";
import { auth } from "@clerk/nextjs";

type UpdateEventProps = {
	params: {
		id: string;
	};
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
	const { sessionClaims } = auth();

	const userId = sessionClaims?.userId as string;
	const quiz = await getQuizById(id);

	return (
		<>
			<HeaderBanner text="Update Quiz" />

			<div className="wrapper my-8">
				<QuizForm type="Update" quiz={quiz} quizId={quiz._id} userId={userId} />
			</div>
		</>
	);
};

export default UpdateEvent;
