const snipe = require('../snipe.json')

module.exports = async (client, newMsg, oldMsg) => {
        if (newMsg.content == oldMsg.content){
            return;
        }
        if (newMsg.author.bot == false) {
            const cid = "e" + newMsg.channel.id;
            if (typeof snipe[cid] == 'undefined') {
                snipe[cid] = [];
            }
            if (snipe[cid].length > 19) {
                snipe[cid].splice(0, 1);
            }
            const esData = {
                "msg": oldMsg.content,
                "id": oldMsg.author.id,
                "time": Date.now()
            }
            snipe[cid].push(esData);
            global.save(snipe, "snipe.json")
        }
}