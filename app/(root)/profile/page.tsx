import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import React from "react";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
	return (
		<>
			<section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
				<div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
					<div className="flex flex-col justify-center gap-8">
						<h1 className="h1-bold">My Profile</h1>
						<p className="p-regular-20 md:p-regular-24">
							TODO: Show list of participating quizzes (In progress / Finished)
						</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default ProfilePage;
