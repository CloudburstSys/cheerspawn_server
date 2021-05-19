/*
	CheerSpawn Server
	Server-side stuff for CheerSpawn.
*/

// Require dependencies and initiate.
require("dotenv").config();
require("./Console.js");
const io = require('socket.io')(3007);
const tmi = require('tmi.js');

const client = new tmi.Client({
	identity: {
		username: process.env.USERNAME,
		password:	process.env.TOKEN
	},
	channels: [ process.env.TARGET ]
});

client.connect();

client.on("cheer", (channel, userstate, message) => {
	// Cheer recieved. Get bits then forward to plugin.
	console.info("Recieved cheer in "+channel.trim().replace("#","")+" by "+userstate["display-name"]+" of "+userstate.bits+" bits.");
	io.emit("donation", userstate.bits);
});

io.on("connection", (socket) => {
	// Connection recieved.
	socket.on("chat", message => {
		if(process.env.CANCHAT == "yes") {
			client.send(process.env.TARGET, message);
		}
	});
});
