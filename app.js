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
    //Parse the message by splitting the command and args
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    //Convert to lowercase to achieve case insensitivity
    const command = args.shift().toLowerCase();
    
    //Command list
    if(command === 'ping') {
        message.channel.send('Pong!');
    } else 
    if (command === 'prefix' && message.author.id == config.ownerID) {
        config.prefix = args[0];
        //Write to config file
        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
        message.channel.send('Prefix has been updated and will be used after the bot restarts.');
    } else
    if (command === 'help') {
        const embed = new Discord.RichEmbed()
        .setTitle("Using the bot")
        .setColor(0x00AE86)
        .setDescription("This bot is still a WIP but here are the implemented public commands:")
        .addField(prefix + "ping", "Print \"pong!\" to the screen.")
        .addField(prefix + "help", "Print this embeded help message.")
        message.channel.send({embed});
    }
});

client.login(config.token);
