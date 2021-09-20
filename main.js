const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require('./config.json');

client.on('ready', () => {
    console.log("bot is online!");
    client.user.setPresence(
        {
            activity: {
                name: "with links",
                type: "PLAYING"
              },
            status: 'dnd',
        }
    )
});

client.on('message', message => {
    
    if (message.author.bot) return;
    if (message.channel.id != "882868054852259850") return;
    const sendChannel = message.guild.channels.cache.get("882868078461988865");

    const args = message.content;
    
    if (args.startsWith("https://cdn.discordapp.com/emojis/")) {
        let index = args.indexOf('?');
        index+=1;
        const delet = args.substring(0, index);
        sendChannel.channel.send(`${delet}size=40`);
    }

    if (args.startsWith("<:") || args.startsWith("<a:")) {
        const emoteRegex = /<:.+:(\d+)>/gm
        const animatedEmoteRegex = /<a:.+:(\d+)>/gm
      
        if (emoji = emoteRegex.exec(args)) {
            const url = `https://cdn.discordapp.com/emojis/${emoji[1]}.png?size=40`;
            sendChannel.channel.send(url)
        } else if (emoji = animatedEmoteRegex.exec(args)) {
            const url = `https://cdn.discordapp.com/emojis/${emoji[1]}.gif?size=40`;
            sendChannel.channel.send(url)
        } else {
            return;
        }

    }

});

client.login(config.token);