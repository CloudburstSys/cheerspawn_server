/*
	CheerSpawn Server
	Server-side stuff for CheerSpawn.
*/

// Require dependencies and initiate.
require("dotenv").config();
require("./Console.js");
const tmi = require('tmi.js');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });


/*const client = new tmi.Client({
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
	wss.clients.forEach(function each(client) {
      		if (client.readyState === WebSocket.OPEN) {
        		client.send(userstate.bits);
      		}
    	});
});*/

app.get("/", (req,res) => {
	res.status(200).json({"ok":true});	
});

wss.on('connection', function connection(ws) {
	// Connection recieved.
	console.info("Recieved connection from (hopefully) the plugin.");
	ws.on('message', function incoming(message) {
    		console.debug("Plugin trying to send message. Verifying that we're allowed to");
		console.debug("Incoming message content: "+message);
		if(process.env.CANCHAT == "yes") {
			console.debug("We're verified to do so. Sending message.");
			//client.send(process.env.TARGET, message);
		}
  	});
});

server.listen(3005, () => {
  console.log('listening on *:3005');
});
