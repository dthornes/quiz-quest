"use client";

import React, { useState } from "react";
import PlayerNameBanner from "@/components/shared/PlayerNameBanner";
import Image from "next/image";

const Result = () => {
	const [isCorrect, setIsCorrect] = useState(true);

	return (
		<div className="m-auto text-center text-white">
			<h2 className="h2-bold mb-5">{isCorrect ? "Correct!" : "Incorrect!"}</h2>
			<Image
				className="m-auto"
				src={
					isCorrect
						? "/assets/icons/correct.svg"
						: "/assets/icons/incorrect.svg"
				}
				alt="Result icon"
				width={80}
				height={80}
			/>

			<PlayerNameBanner />
		</div>
	);
};

export default Result;
