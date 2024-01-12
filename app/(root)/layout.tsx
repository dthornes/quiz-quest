import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { WebsocketsContextProvider } from "@/context/WebsocketsContext";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<WebsocketsContextProvider>
			<div className="flex h-screen flex-col">
				<Header />
				<main className="flex-1">{children}</main>
				<Footer />
			</div>
		</WebsocketsContextProvider>
	);
}
