"use client";

import React, { createContext, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

interface SocketsContextValue {
	socket: Socket;
}

const socket = io("http://localhost:3001");

export const SocketsContext = createContext<SocketsContextValue>(
	null as unknown as SocketsContextValue
);

export const SocketsContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const contextValue: SocketsContextValue = {
		socket,
	};

	return (
		<SocketsContext.Provider value={contextValue}>
			{children}
		</SocketsContext.Provider>
	);
};
