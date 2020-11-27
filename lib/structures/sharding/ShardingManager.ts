import Client from '../Client.ts';
import Shard from './Shard.ts';
export default class ShardingManager {
    private _shards: Shard[];
    private _client: Client;
    constructor(token: string, shardCount: number, client: Client) {
        this._client = client;
        this._shards = [];
        for(let i = 0; i < shardCount; i++) {
            //this._shards.push(new Shard(this, i));
        }
    }

    async getRecommendedShards() {
        return this._client.guilds.length * (1000 / this._shards.length);
    }
    get shards(): Shard[] { return this._shards; }
}