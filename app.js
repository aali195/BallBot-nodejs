const Discord = require ('discord.js');
const config = require('./config.json');
const fs = require('fs');

//const client = new Discord.Client({disableEveryone: true});
const client = new Discord.Client();
let prefix = config.prefix;

client.on('ready', async () => {
    console.log(`${client.user.username} is now online`);
    
    try {
        // Assign a link after it is retrieved
        let link = await client.generateInvite(['ADMINISTRATOR']);
        console.log(link);
    } catch(e) {
        console.log(e.stack);
    }
});

client.on('message', async (message) => {
    // Ignore messages not starting with the prefix or if the author is a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    // Ignore if the message is a DM
    if (message.channel.type === 'DM' && !(message.author.id === config.ownerId)) return;
    
    // Parse the message by slicing the prefix, triming the extra spaces and then splitting by space
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    // Convert to lowercase to achieve case insensitivity and assign
    let command = args.shift().toLowerCase();
    
    // Command list
    if(command === 'ping') {
        message.channel.send('Pong!');
        return;
    } else if (command === 'prefix' && message.author.id === config.ownerId) {
        // Requires restarting the bot for now
        config.prefix = args[0];
        // Write to config file
        fs.writeFile('./config.json', JSON.stringify(config), (err) => console.error);
        message.channel.send('Prefix has been updated and will be used after the bot restarts.');
        return;
    } else if (command === 'help') {
        let embed = new Discord.RichEmbed()
        .setTitle('Using the bot')
        .setColor(0x00AE86)
        .setDescription('This bot is still a WIP but here are the implemented public commands:')
        .addField(prefix + 'ping', 'Prints \"pong!\" to the screen.')
        .addField(prefix + 'help', 'Prints this embeded help message.')
        message.channel.send({embed});
        return;
    }
});

client.login(config.token);
