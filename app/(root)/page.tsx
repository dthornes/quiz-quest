import QuizCollection from "@/components/shared/QuizCollection";
import { SearchParamProps } from "@/types";

export default async function Home({ searchParams }: SearchParamProps) {
	return (
		<section
			id="quizzes"
			className="wrapper my-8 flex flex-col gap-8 md:gap-12"
		>
			<h2 className="h2-bold">Available Quizzes</h2>

			<QuizCollection searchParams={searchParams} />
		</section>
	);
}
