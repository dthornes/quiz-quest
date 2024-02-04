import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/player/joining",
		"/player/instructions",
		"/player/start",
		"/player/question",
		"/player/result",
		"/player/ranking",
		"/quiz/:id/play", // TODO: Remove old routes
		"/api/webhook/clerk",
		"/api/uploadthing",
	],
	ignoredRoutes: ["/api/webhook/clerk", "/api/uploadthing"],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
