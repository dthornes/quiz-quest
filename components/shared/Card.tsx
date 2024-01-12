import { IQuiz } from "@/lib/database/models/quiz.model";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { Button } from "../ui/button";

type CardProps = {
	quiz: IQuiz;
};

const Card = ({ quiz }: CardProps) => {
	const { sessionClaims } = auth();
	const userId = sessionClaims?.userId as string;

	const isEventCreator = userId === quiz.createdBy._id.toString();

	return (
		<div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
			<Link
				href={`/events/${quiz._id}`}
				style={{ backgroundImage: `url(${quiz.imageUrl})` }}
				className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
			/>

			{isEventCreator && (
				<div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
					<Link href={`/quiz/${quiz._id}/update`}>
						<Image
							src="/assets/icons/edit.svg"
							alt="edit"
							width={20}
							height={20}
						/>
					</Link>

					<DeleteConfirmation quizId={quiz._id} />
				</div>
			)}

			<div className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4">
				<p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
					{quiz.title}
				</p>

				<div className="flex-between w-full">
					<p className="p-medium-14 md:p-medium-16 text-grey-600">
						Created by {quiz.createdBy.username}
					</p>
				</div>

				<div className="mt-auto w-full">
					<Button size="lg" className="button col-span-2 w-full" asChild>
						<Link href={`/quiz/${quiz._id}/play`}>Play</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Card;
