import { IQuiz } from "@/lib/database/models/quiz.model";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";

type CardProps = {
	quiz: IQuiz;
	hasOrderLink?: boolean;
	hidePrice?: boolean;
};

const Card = ({ quiz, hasOrderLink, hidePrice }: CardProps) => {
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

			{isEventCreator && !hidePrice && (
				<div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
					<Link href={`/events/${quiz._id}/update`}>
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
				{!hidePrice && (
					<div className="flex gap-2">
						<p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500 line-clamp-1">
							{quiz.category.name}
						</p>
					</div>
				)}

				<Link href={`/events/${quiz._id}`}>
					<p className="p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black">
						{quiz.title}
					</p>
				</Link>

				<div className="flex-between w-full">
					<p className="p-medium-14 md:p-medium-16 text-grey-600">
						{quiz.createdBy.firstName} {quiz.createdBy.lastName}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Card;
