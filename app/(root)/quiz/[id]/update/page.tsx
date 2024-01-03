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
			<section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
				<h3 className="wrapper h3-bold text-center sm:text-left">
					Update Quiz
				</h3>
			</section>

			<div className="wrapper my-8">
				<QuizForm type="Update" quiz={quiz} quizId={quiz._id} userId={userId} />
			</div>
		</>
	);
};

export default UpdateEvent;
