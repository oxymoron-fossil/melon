const config = require('../config.json')

module.exports = {
	name: 'leave',
	description: 'Leaves a server specified by a server id.',
	async execute(message, args) {
        if (message.author.id !== config.owner){
			return
		}
		if(!args[0]){
			message.channel.send(`What server do you want me to leave? If needed, use \`lon servers\` for reference.`)
		}else{
		 client.guilds.cache.get(args[0]).leave()
		 message.reply('successfully left ' + client.guilds.cache.get(args[0]).name)
		}
    }
};