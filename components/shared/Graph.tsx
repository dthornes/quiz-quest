import { ClassColourProps, classColours } from "@/utils";
import clsx from "clsx";
import Image from "next/image";

type GraphBarProps = {
	icon: "triangle" | "diamond" | "circle" | "square";
} & ClassColourProps;

const graphPercentage = () => {
	return {
		0: "h-[10%]",
		25: "h-[25%]",
		50: "h-[50%]",
		75: "h-[75%]",
		100: "h-[100%]",
	};
};

const GraphBar = ({ colour, icon }: GraphBarProps) => {
	return (
		<div
			className={clsx(
				classColours({ colour }),
				"p-bold-20 text-white rounded-sm w-[104px] py-2 flex flex-col justify-end",
				graphPercentage()[0]
			)}
		>
			<div>
				<Image
					className="fill-white inline-block align-sub"
					src={`/assets/icons/${icon}.svg`}
					alt="Graph Icon"
					width={25}
					height={25}
				/>
				<span>0</span>
				{/* If correct show tick */}
				<Image
					className="fill-white inline-block align-sub"
					src={`/assets/icons/tick.svg`}
					alt="Correct Icon"
					width={25}
					height={25}
				/>
			</div>
		</div>
	);
};

const Graph = () => {
	return (
		<div className="flex gap-5 h-full items-end">
			<GraphBar colour="blue" icon="triangle" />
			<GraphBar colour="red" icon="diamond" />
			<GraphBar colour="yellow" icon="circle" />
			<GraphBar colour="green" icon="square" />
		</div>
	);
};

export default Graph;
