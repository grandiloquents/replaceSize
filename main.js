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
    
    if(message.author.bot && !message.webhookId) return;
    
    let sendChannel;
    
    if (message.channel.id === "882868054852259850") {
        sendChannel = message.guild.channels.cache.get("882868078461988865");
    } else  if (message.channel.id === "747748343119347783") {
        sendChannel = message.guild.channels.cache.get("747748343119347783");
    } else return;

    const args = message.content;
    
    if (args.startsWith("https://cdn.discordapp.com/emojis/")) {
        let index = args.indexOf('?');
        index+=1;
        const delet = args.substring(0, index);
        sendChannel.send(`${delet}size=40`);
    }

    if (args.startsWith("<:") || args.startsWith("<a:")) {
        const emoteRegex = /<:.+:(\d+)>/gm
        const animatedEmoteRegex = /<a:.+:(\d+)>/gm
      
        if (emoji = emoteRegex.exec(args)) {
            const url = `https://cdn.discordapp.com/emojis/${emoji[1]}.png?size=40`;
            sendChannel.send(url)
        } else if (emoji = animatedEmoteRegex.exec(args)) {
            const url = `https://cdn.discordapp.com/emojis/${emoji[1]}.gif?size=40`;
            sendChannel.send(url)
        } else {
            return;
        }

    }

});

client.login(config.token);
