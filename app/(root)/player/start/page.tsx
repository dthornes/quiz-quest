import Loader from "@/components/quiz/Loader";
import PlayerNameBanner from "@/components/shared/PlayerNameBanner";
import React from "react";

const Start = () => {
	return (
		<div className="m-auto text-center text-white">
			<h1 className="h1-bold">Question 1</h1>
			<Loader />

			<PlayerNameBanner />
		</div>
	);
};

export default Start;
