import { WebSocketServer } from "ws";

export function setupWebSocketServer(server: any) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.send("Welcome to Pulse Realtime Dashboard WebSocket Server");

    // Will add more websocket functionalities later

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  })
}