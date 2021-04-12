export interface WsConnectHelper {
    (url: string, params?: {[keys: string]: any}): Promise<WebSocket>;
}
