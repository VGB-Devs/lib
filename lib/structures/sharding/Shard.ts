import ShardingManager from "./ShardingManager.ts";

export default class Shard {
    private _id: number;
    //private _main: Deno.Process;
    private _manager: ShardingManager;
    constructor(manager: ShardingManager, id: number) {
        this._id = id;
        //this._main = new Deno.Process();
        this._manager = manager;

    }
    /*async status() {
        return await this._main.status();
    }

    get id(): number { return this._id; }
    get mainProcess(): Deno.Process { return this._main; }*/
    get manager(): ShardingManager { return this._manager; }

}