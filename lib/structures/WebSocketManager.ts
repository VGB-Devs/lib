import { connectWebSocket, WebSocket } from 'https://cdn.deno.land/std/versions/0.68.0/raw/ws/mod.ts';
import { Constants, OPCODE } from "../constants/Constants.ts";
import { Heartbeat, Identify } from '../constants/Payloads.ts';
import CoreClient from './Client.ts';
import Payload from './Payload.ts'

export default class WebSocketManager {
    public socket!: WebSocket;
    private interval: number = 0;
    private client: CoreClient;
    private _ping: number = 0;
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
                        this._ping = Date.now() - this._ping
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
        // Run when first called
        this._ping = Date.now()
        this.socket.send(JSON.stringify(Heartbeat));
        
        return setInterval(() => {
            this._ping = Date.now()
            this.socket.send(JSON.stringify(Heartbeat));
        }, ms)
    }

    get latency(): number { return this._ping }

    async identify(token: string) {
        Identify.d.token = token;
        return this.socket.send(JSON.stringify(Identify));
    }
}