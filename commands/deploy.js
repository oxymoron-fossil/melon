const fs = require('fs')

module.exports = {
	name: 'deploy',
	description: 'Deploys a new module of Melon to the Raspberry Pi!',
	async execute(message, args) {
		if (message.author.id !== config.owner){
            return message.reply('you\'re not my owner, why are you trying to use this?')
        }else {
            if (!message.attachments.first()) return message.reply("You need to deploy something <:chadkin:764698118213206026>")
            fetch(message.attachments.first().url).then(async res => {
                if (fs.existsSync(message.attachments.first().name) && fs.lstatSync(message.attachments.first().name).isFile()) {
                    await message.channel.send("This file already exists, overwriting...", { files: [message.attachments.first().name] })
                    fs.unlink(message.attachments.first().name, () => { })
                }
                const dest = fs.createWriteStream(`./${message.attachments.first().name}`);
                res.body.pipe(dest);
            })
		}
	
    }
};