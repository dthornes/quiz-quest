import Header from "@/components/shared/Header";
import { SocketsContextProvider } from "@/context/SocketsContext";

type RootLayoutProps = {
	children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<SocketsContextProvider>
			<div className="flex h-screen flex-col">
				<Header />
				<main className="bg-orange-400 h-full flex justify-center py-5 overflow-hidden">
					{children}
				</main>
			</div>
		</SocketsContextProvider>
	);
}
