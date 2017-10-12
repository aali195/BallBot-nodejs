const Discord = require ('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require("fs");

var prefix = config.prefix;

client.on("ready", () => {
    console.log("Online");
});

client.on("message", (message) => {
    //Ignore messages not starting with the prefix or if the author is a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    if (message.content.startsWith(prefix + "ping")) {
        message.channel.send("pong!");
    }
    //Allows changing of the prefix using the command
    if (message.content.startsWith(prefix + "prefix" || message.author.id == config.ownerID)) {
        let newPrefix = message.content.split(" ").slice(1,2)[0];
        config.prefix = newPrefix;
        //Write to config file
        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
    }
});

client.login(config.token);
