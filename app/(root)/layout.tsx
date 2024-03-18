import { QuizProvider } from "@/context/QuizContext";
import { SocketsProvider } from "@/context/SocketsContext";

type RootLayoutProps = {
	children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<SocketsProvider>
			<QuizProvider>
				<div className="flex h-screen flex-col">
					<main className="bg-primary-400 h-full flex justify-center py-5 overflow-hidden">
						{children}
					</main>
				</div>
			</QuizProvider>
		</SocketsProvider>
	);
}
