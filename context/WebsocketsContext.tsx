"use client";

import React, { createContext, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

interface WebsocketsContextValue {
	socket: Socket;
}

const socket = io("http://localhost:3001");

export const WebsocketsContext = createContext<WebsocketsContextValue>(
	null as unknown as WebsocketsContextValue
);

export const WebsocketsContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const contextValue: WebsocketsContextValue = {
		socket,
	};

	return (
		<WebsocketsContext.Provider value={contextValue}>
			{children}
		</WebsocketsContext.Provider>
	);
};
