import { connectWebSocket, WebSocket } from 'https://cdn.deno.land/std/versions/0.68.0/raw/ws/mod.ts';
import { Constants, OPCODE } from "../constants/Constants.ts";
import { Heartbeat, Identify } from '../constants/Payloads.ts';
import CoreClient from './Client.ts';
import Payload from './Payload.ts'

export default class WebSocketManager {
    public socket!: WebSocket;
    private interval: number = 0;
    private client: CoreClient;
    constructor(client: CoreClient) {
        this.client = client;
    }

    async connect(token: string) {
        try {
            this.socket = await connectWebSocket(Constants.GATEWAY);
            for await(const msg of this.socket) {
                const payload: Payload = JSON.parse(msg.toString());
                const { t: event, s, op, d } = payload;
                switch(op) {
                    case OPCODE.HELLO:
                        const { heartbeat_interval } = d;
                        this.interval = this.heartbeat(heartbeat_interval);
                        await this.identify(token);
                        break;
                    case OPCODE.HEARTBEAT_ACK:
                        break;
                    
                    case OPCODE.INVALID_SESSION:
                        console.log("invalid session: reidentifying");
                        this.identify(this.client.token);
                }
                if(event) {
                    const { default: module } = await import(`../handlers/${event}.ts`)
                    module(this.client, payload)
                }
            }
        } catch(e) {
            console.log(e);
        }
    }

    heartbeat(ms: number) {
        return setInterval(() => {
            this.socket.send(JSON.stringify(Heartbeat));
        }, ms)
    }
    async identify(token: string) {
        Identify.d.token = token;
        return this.socket.send(JSON.stringify(Identify));
    }
}