import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Home = () => {
	return (
		<div className="bg-white p-3 rounded-sm md:w-[300px]">
			<Input
				placeholder="Game PIN"
				className="input-field flex-1"
				// onChange={(e) => setPlayerName(e.target.value)}
			/>
			<Button className="w-full">Enter</Button>
		</div>
	);
};

export default Home;
