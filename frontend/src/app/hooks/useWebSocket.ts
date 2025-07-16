"use client";

import { useEffect, useState, useRef } from "react";

export function useWebSocket(url: string) {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      console.log("WebSocket connection established");
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
      console.log("WebSocket connection closed on cleanup");
    };
  }, [url]);

  return {
    isConnected
  };
}