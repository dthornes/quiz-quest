import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import "./animation.css";

type LayoutProps = {
	children: React.ReactNode;
};

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-montserrat",
});

export const metadata: Metadata = {
	title: "Quiz Quest",
	description: "Quiz Quest is a online platform for party games.",
	icons: {
		icon: "/assets/images/logo.jpg",
	},
};

export default function RootLayout({ children }: LayoutProps) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={montserrat.variable}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
