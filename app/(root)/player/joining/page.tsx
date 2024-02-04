import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const Joining = () => {
	return (
		<div className="bg-white p-3 rounded-sm md:w-[300px] m-auto">
			<Input
				placeholder="Nickname"
				className="input-field flex-1"
				// onChange={(e) => setPlayerName(e.target.value)}
			/>
			<Button className="w-full" asChild>
				<Link href="/player/instructions">Go!</Link>
			</Button>
		</div>
	);
};

export default Joining;
