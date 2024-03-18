import Header from "@/components/shared/Header";
import { SocketsProvider } from "@/context/SocketsContext";

type AdminLayoutProps = {
	children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
	return (
		<SocketsProvider>
			<div className="flex h-screen flex-col">
				<Header />
				<main>{children}</main>
			</div>
		</SocketsProvider>
	);
}
