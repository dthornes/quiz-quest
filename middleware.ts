import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/host/joining",
		"/host/question",
		"/host/scoreboard",
		"/quiz/:id/play",
		"/api/webhook/clerk",
		"/api/uploadthing",
	],
	ignoredRoutes: ["/api/webhook/clerk", "/api/uploadthing"],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
