const afk = require('../afk.json')
const fs = require('fs')

module.exports = async (client, message) => {
            for (var afkIndex = 0; afkIndex < message.mentions.users.array().length; afkIndex++) {
            if (typeof afk[message.mentions.users.array()[afkIndex].id] !== 'undefined') {
                afkMention = message.mentions.users.array()[afkIndex].id;
                var aMsg
                if (typeof afk[afkMention].message == 'undefined') {
                    aMsg = "."
                } else {
                    aMsg = ": " + afk[afkMention].message;
                }
                const afkEmbed = new Discord.MessageEmbed()
                    .setTitle(" ")
                    .setColor('#800080')
                    .setDescription("<@" + afkMention + "> is currently afk" + aMsg)
                    .setFooter("They have been afk for " + global.millisecondsToLength(message.createdTimestamp - afk[afkMention].time))
                if (typeof afk[afkMention].image !== 'undefined') {
                    afkEmbed.setImage(afk[afkMention].image)
                }
                message.channel.send(afkEmbed);
        
            }
        
        }
        if (typeof afk[message.author.id] !== 'undefined') {
                delete afk[message.author.id]
                const m = await message.reply("whalecum back! Your friends didn't miss you.");
                m.delete({ timeout: 5000 }).catch(() => { })
                fs.writeFile('afk.json', JSON.stringify(afk), 'utf8', () => { });
        }
}