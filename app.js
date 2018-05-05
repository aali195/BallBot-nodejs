const Discord = require ('discord.js');
const config = require('./config.json');
const fs = require('fs');

const client = new Discord.Client();

let prefix = config.prefix;

client.commands = new Discord.Collection();

// Retrieves a list of commands in the commands directory
fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    
    // Creates an array for the command files and filters for ones that end in 'js'
    let jsfiles = files.filter(f => f.split('.').pop() === 'js');
    // Checks for the length of the created array of commands
    if (jsfiles.length <= 0) {
        console.log('No command files found.');
        return;
    }
    
    console.log(`Loading ${jsfiles.length} commands`);
    
    // Loads the command modules and sets them
    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded.`);
        client.commands.set(props.help.name, props);
    });
    
});

client.on('ready', async () => {
    console.log(`${client.user.username} is now online`);
    console.log(client.commands);
    
    try {
        // Assign a link after it is retrieved
        let link = await client.generateInvite(['ADMINISTRATOR']);
        console.log(link);
    } catch(e) {
        console.log(e.stack);
    }
    
    client.user.setActivity(`${prefix}help`, {type: 'PLAYING'});
});

client.on('message', async (message) => {
    // Ignore messages not starting with the prefix or if the author is a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    // Ignore if the message is a DM and is not sent by the owner
    if (message.channel.type === 'DM' && (message.author.id !== config.ownerId)) return;
    
    // Parse the message by slicing the prefix, triming the extra spaces and then splitting by space regex
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    // Convert to lowercase to achieve case insensitivity and assign
    let command = args.shift().toLowerCase();
    
    // Sets the command to a variable and runs it if it is found
    let cmd = client.commands.get(command);
    if (cmd) cmd.run(client, message, args);
    
    return;
});

client.login(config.token);
