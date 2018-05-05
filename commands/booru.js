const Discord = require ('discord.js');
const fetch = require('snekfetch');

module.exports.run = async (client, message, args) => {
    if (args.length > 2) return message.channel.send('Only up to two tags can be used.');
    const msg = await message.channel.send('Searching...');
    
    const tags = args.toString().replace(/,/g, '+');
    const call = `https://danbooru.donmai.us/posts.json?limit=100&tags=${tags}+rating:s`;
    console.log(`API Call: ${call}`);
    fetch.get(call)
    .then(async r => {
        const result = r.body[Math.floor(Math.random() * r.body.length)];
        if (!result) return msg.edit('Could not find any results with those tags.');
        await msg.edit({
            embed: {
                "title":`${tags}`,
                "url": `https://danbooru.donmai.us/post/show/${result.id}`,
                "color": 6192321,
                "image": {
                    "url": `${result.file_url}`
                },
            }
        })
    });
}

module.exports.help = {
    name: "booru"
}
