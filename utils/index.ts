"use client";

export type ClassColourProps = {
	colour: "blue" | "red" | "yellow" | "green";
};

export const { blue, red, yellow, green } = {
	blue: "bg-blue-600 border-b-blue-800 hover:bg-blue-500",
	red: "bg-red-600 border-b-red-800 hover:bg-red-500",
	yellow: "bg-yellow-500 border-b-yellow-700 hover:bg-yellow-400",
	green: "bg-green-600 border-b-green-800 hover:bg-green-500",
};

export const classColours = ({ colour }: ClassColourProps) => {
	const colours = {
		blue,
		red,
		yellow,
		green,
	};

	return colours[colour];
};
