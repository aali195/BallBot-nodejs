const fs = require('fs');

module.exports.run = async (client, message, args) => {
    if (message.author.id !== config.ownerId) return;
    // Requires restarting the bot for now
    config.prefix = args[0];
    // Write to config file
    fs.writeFile('./config.json', JSON.stringify(config), (err) => console.error);
    message.channel.send('Prefix has been updated and will be used after the bot restarts.');
}

module.exports.help = {
    name: "prefix"
} 
