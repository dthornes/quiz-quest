import React from "react";
import Collection from "./Collection";
import { getAllQuizzes } from "@/lib/actions/quiz.actions";
import { SearchParamProps } from "@/types";
import Search from "./Search";
import CategoryFilter from "./CategoryFilter";

const QuizCollection = async ({ searchParams }: SearchParamProps) => {
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
				emptyStateSubtext="Come back later"
				collectionType="All_Quizzes"
				limit={6}
				page={page}
				totalPages={quizzes?.totalPages}
			/>
		</>
	);
};

export default QuizCollection;
