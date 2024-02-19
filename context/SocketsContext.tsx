"use client";

import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface SocketsContextProps {
	socket: Socket;
}

const socket = io("http://localhost:3001");

export const SocketsContext = createContext<SocketsContextProps>(
	null as unknown as SocketsContextProps
);

export const SocketsProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	return (
		<SocketsContext.Provider value={{ socket }}>
			{children}
		</SocketsContext.Provider>
	);
};
