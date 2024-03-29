import PlayButton from "@/components/shared/PlayButton";
import { Button } from "@/components/ui/button";
import { getQuizById } from "@/lib/actions/quiz.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const EventDetails = async ({ params: { id } }: SearchParamProps) => {
	const { sessionClaims } = auth();

	const userId = sessionClaims?.userId as string;

	const quiz = await getQuizById(id);

	return (
		<section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
			<div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
				{quiz.imageUrl && (
					<Image
						src={quiz.imageUrl}
						alt="hero image"
						width={1000}
						height={1000}
						className="h-full min-h-[300px] object-cover object-center"
					/>
				)}

				<div className="flex w-full flex-col gap-8 p-5 md:p-10">
					<div className="flex flex-col gap-6">
						<h2 className="h2-bold">{quiz.title}</h2>

						<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
							<div className="flex gap-3">
								<p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
									{quiz.category.name}
								</p>
							</div>
							<p className="p-medium-18 ml-2 mt-2 sm:mt-0">
								by{" "}
								<span className="text-primary-500">
									{quiz.createdBy.username}
								</span>
							</p>
						</div>
					</div>
					<div className="mt-auto flex gap-2">
						<Button className="button w-full" asChild>
							<Link href={`/quiz/${id}/update`}>Update</Link>
						</Button>
						{/* TODO: Realtime update of active button */}
						<PlayButton
							userId={userId}
							quizId={id}
							isActive={quiz.isActive ? false : true}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default EventDetails;
