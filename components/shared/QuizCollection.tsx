import { getAllQuizzes } from "@/lib/actions/quiz.actions";
import { SearchCollectionProps } from "@/types";
import CategoryFilter from "./CategoryFilter";
import Collection from "./Collection";
import Search from "./Search";

const QuizCollection = async ({ searchParams }: SearchCollectionProps) => {
	const page = Number(searchParams?.page) || 1;
	const searchText = (searchParams?.query as string) || "";
	const category = (searchParams?.category as string) || "";

	const quizzes = await getAllQuizzes({
		query: searchText,
		category,
		page,
		limit: 6,
	});

	return (
		<>
			<div className="flex w-full flex-col gap-5 md:flex-row">
				<Search />
				<CategoryFilter />
			</div>
			<Collection
				data={quizzes?.data}
				emptyTitle="No Quizzes Found"
				limit={6}
				page={page}
				totalPages={quizzes?.totalPages}
			/>
		</>
	);
};

export default QuizCollection;
