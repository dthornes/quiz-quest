import Confetti from "@/components/shared/Confetti";
import Ribbon from "@/components/shared/Ribbon";

const Ranking = () => {
	// TODO: drum roll loader...

	return (
		<>
			<div className="flex flex-col justify-center items-center text-white z-10">
				<h3 className="h3-bold mb-5">PlayerNameHere</h3>
				{/* TODO: Manage podium position */}
				<Ribbon podiumImage="first-place" />
			</div>
			<div className="bg-sunburst">
				<Confetti />
			</div>
		</>
	);
};

export default Ranking;
