"use client";

import React, { useContext, useEffect, useState } from "react";
import { SocketsContext } from "@/context/SocketsContext";

const WebsocketsConnection = () => {
	const { socket } = useContext(SocketsContext);
	const [connected, setConnected] = useState(false);

	useEffect(() => {
		setConnected(socket.connected);
	}, [socket.connected]);

	return (
		<span
			className={`w-3 h-3 rounded-lg my-auto ${
				connected ? "bg-green-600" : "bg-red-600"
			}`}
		></span>
	);
};

export default WebsocketsConnection;
