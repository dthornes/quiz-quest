import { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { ClassColourProps, classColours } from "@/utils";

type AnswerProps = {
	selectedAnswer: string | null;
	setSelectedAnswer: Dispatch<SetStateAction<string | null>>;
	value: string;
} & ClassColourProps;

const Answer = ({
	selectedAnswer,
	setSelectedAnswer,
	colour,
	value,
}: AnswerProps) => (
	<Button
		size="full"
		className={classColours({ colour })}
		onClick={(e) => {
			setSelectedAnswer(e.currentTarget.value);
		}}
		value={value}
		disabled={selectedAnswer !== null && selectedAnswer !== value}
	>
		{value}
	</Button>
);

export default Answer;
