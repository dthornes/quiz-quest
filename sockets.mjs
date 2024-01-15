import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

const connectedPlayers = {};

io.on("connection", (socket) => {
	console.log("A player connected:", socket.id);

	socket.on("add_player", ({ roomId, player }) => {
		if (!(socket.id in connectedPlayers)) {
			connectedPlayers[socket.id] = player;
			socket.join(roomId);

			console.log(`Player ${player} has joined room ${roomId}`);
			console.log(`Player list is ${JSON.stringify(connectedPlayers)}`);

			io.emit("player_list", Object.values(connectedPlayers));
		}
	});

	socket.on("confirm_players", ({ roomId }) => {
		io.to(roomId).emit("start_quiz");
	});

	socket.on("disconnect", () => {
		delete connectedPlayers[socket.id];
		console.log("A player disconnected:", socket.id);
	});
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
	console.log(`Socket.io server is running on port ${PORT}`);
});
