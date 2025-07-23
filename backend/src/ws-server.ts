import { WebSocketServer, WebSocket } from "ws";

type DashboardId = string;

const dashboardClients = new Map<DashboardId, Set<WebSocket>>();

export function setupWebSocketServer(server: any) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    let currentDashboardId: DashboardId | null = null;

    ws.send("Welcome to Pulse Realtime Dashboard WebSocket Server");

    ws.on("message", (message: string) => {
      try {
        const parsed = JSON.parse(message);
        const { type, dashboardId, widget } = parsed;

        switch (type) {
          case "subscribe":
            // Remove from previous dashboard
            if (currentDashboardId && dashboardClients.has(currentDashboardId)) {
              dashboardClients.get(currentDashboardId)?.delete(ws);
            }

            // Add to new dashboard
            if (!dashboardClients.has(dashboardId)) {
              dashboardClients.set(dashboardId, new Set());
            }
            dashboardClients.get(dashboardId)!.add(ws);
            currentDashboardId = dashboardId;
            console.log(`Client subscribed to dashboard ${dashboardId}`);
            break;

          case "widget_add":
          case "widget_update":
          case "widget_remove": {
            const clients = dashboardClients.get(dashboardId);
            if (!clients) break;

            for (const client of clients) {
              if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                  type,
                  dashboardId,
                  ...(type === "widget_remove"
                    ? { widgetId: widget.id }
                    : { widget }),
                }));
              }
            }

            break;
          }

          default:
            console.warn("Unknown message type:", type);
            ws.send(JSON.stringify({
              type: "error",
              message: "Unknown message type"
            }));
            break;
        }
      } catch (error: any) {
        console.error("Invalid message format:", error.toString());
        ws.send(JSON.stringify({
          type: "error",
          message: "Invalid message format"
        }));
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  })
}