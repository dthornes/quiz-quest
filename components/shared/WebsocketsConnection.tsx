"use client";

import React, { useContext } from "react";
import { WebsocketsContext } from "@/context/WebsocketsContext";

const WebsocketsConnection = () => {
	const { socket } = useContext(WebsocketsContext);
	console.log("Socket connected", socket.connected);
	const isConnected = socket ? socket.connected : false;

	return (
		<span
			className={`w-3 h-3 rounded-lg my-auto ${
				isConnected ? "bg-green-600" : "bg-red-600"
			}`}
		></span>
	);
};

export default WebsocketsConnection;
