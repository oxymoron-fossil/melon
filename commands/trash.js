const Canvas = require('canvas')
const Discord = require('discord.js')

module.exports = {
	name: 'trash',
	description: 'Puts the annoying trash were they belong, the trashcan.',
	async execute(message, args) {
        const mUser = global.guildFind(message)
		const canvas = Canvas.createCanvas(300, 300);
		const ctx = canvas.getContext('2d');
		const background = await Canvas.loadImage('wallpaper.jpg');
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = '#74037b';
		ctx.strokeRect(0, 0, canvas.width, canvas.height);
		const avatar = await Canvas.loadImage(mUser.displayAvatarURL({ format: 'jpg' }));
		ctx.drawImage(avatar, 100, 100 , 100, 100);
		const trashcan = await Canvas.loadImage('trash.png');
		ctx.drawImage(trashcan, 75, 150, 150, 130);	
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'trash-image.png');
		message.channel.send(attachment);
    }
};