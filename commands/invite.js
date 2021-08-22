module.exports = {
	name: 'invite',
	description: 'The invite link to Melon, if for some reason you need to use it.',
	alias: ['link'],
	async execute(message, args) {
        message.reply('here is my invite link: <https://discord.com/api/oauth2/authorize?client_id=717196460789203035&permissions=2080894071&scope=bot>')
    }
};