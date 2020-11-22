import Client from '../structures/Client.ts';
//import Payload from '../structures/Payload.ts';

export default function(client: Client, /*payload: Payload*/) {
    client.emit("typingStart")
}