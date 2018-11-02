const Discord = require ('discord.js');

module.exports.run = async (client, message, args) => {
    let embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    // Regex that replaces ',' with a space in args and then replaces the space by a '+'
    // Args are then passed into the Google search URL
    .addField('Look it up yourself next time.', '[' + args.toString().replace(/,/g, ' ') + '](https://www.google.com/search?q=' + args.toString().replace(/,/g, '+') + ')')
    message.channel.send({embed});
}

module.exports.help = {
    name: "google"
}
