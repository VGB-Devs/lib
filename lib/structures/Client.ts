import EventEmitter from 'https://deno.land/std@0.77.0/node/events.ts';
import Guild from "./Guild.ts";
import WebSocketManager from './WebSocketManager.ts';

export default class CoreClient extends EventEmitter {
    private socket: WebSocketManager = new WebSocketManager(this);
    public guilds: Guild[];
    private tkn: string;
    constructor(token: string) {
        super();
        this.tkn = token;
        this.guilds = [];
    }
    
    async start() {
        this.socket.connect(this.tkn);
    }
    get token(): string {
        return this.tkn;
    }
}
