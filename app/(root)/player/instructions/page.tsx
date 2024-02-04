import PlayerNameBanner from "@/components/shared/PlayerNameBanner";

const Instructions = () => {
	return (
		<div className="m-auto text-center text-white">
			<h1 className="h1-bold">You're In!</h1>
			<p className="p-bold-20">See your nickname below</p>

			<PlayerNameBanner />
		</div>
	);
};

export default Instructions;
