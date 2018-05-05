const Discord = require ('discord.js');
const config = require('../config.json');

let prefix = config.prefix;

module.exports.run = async (client, message, args) => {
    let embed = new Discord.RichEmbed()
    .setTitle('Using the bot')
    .setColor(0x00AE86)
    .setDescription('This bot is still a WIP but here are the implemented public commands:')
    .addField(prefix + 'ping', 'Prints \"Pong!\" as well as the latency.')
    .addField(prefix + 'help', 'Prints this embeded help message.')
    .addField(prefix + 'google', 'Searches a line of text on Google.')
    message.channel.send({embed});
    return;
}

module.exports.help = {
    name: "help"
} 

