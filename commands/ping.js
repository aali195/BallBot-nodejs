module.exports.run = async (client, message, args) => {
    message.channel.send('Pong!');
    return;
}

module.exports.help = {
    name: "ping"
}
