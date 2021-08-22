const snipe = require('../snipe.json')
const fs = require('fs')

module.exports = async (client, messageDelete) => {
        if (messageDelete.channel.type !== 'text') {
            return;
        }
        if (messageDelete.author.bot) return;
        
        const cid = "s" + messageDelete.channel.id;
        if (typeof snipe[cid] == 'undefined') {
            snipe[cid] = [];
        }
        if (snipe[cid].length > 19) {
            snipe[cid].splice(0, 1);
        }
        var snipeData = {
            "msg": messageDelete.content,
            "id": messageDelete.author.id,
            "time": Date.now()
        }
        if (messageDelete.attachments.first()) {
            snipeData.img = messageDelete.attachments.first().proxyURL;
        }
        snipe[cid].push(snipeData);
        global.save(snipe, "snipe.json")
}