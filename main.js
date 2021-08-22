const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const querystring = require('querystring');
const fetch = require("node-fetch")
const fs = require('fs')
const Canvas = require('canvas');
const math = require('mathjs');
const Enmap = require('enmap')

const log = message => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
  };

client.events = new Discord.Collection();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

global.guildFind = function(message) {
    if (!message.guild) return false
    if (message.mentions.members.first()) return message.mentions.members.first().user
    const prefix = config.prefix
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    args.shift()
    if (args.length == 0) return message.author
    if (message.guild.members.cache.has(args.join(" "))) return message.guild.members.cache.get(args.join(" ")).user
    const res = message.guild.members.cache.find(member => member.user.username.toLowerCase().includes(args.join(" ").toLowerCase()) || member.user.tag.toLowerCase() == args.join(" ").toLowerCase() || member.displayName.toLowerCase().includes(args.join(" ").toLowerCase()))
    if (res) return res.user
    return false
}
global.autoEmbed = function(text) {
	return new Discord.MessageEmbed().setDescription(text).setColor('#800080')
}
global.Range = function(min, max) {
	minRNG = Math.ceil(min);
	maxRNG = Math.floor(max);
	return Math.floor(Math.random() * (maxRNG - minRNG + 1)) + minRNG;
}; 
global.millisecondsToLength = function(ts) {
    if (ts < 0) {
        ts = 0
    }
    const d = Math.floor(ts / 86400000)
    const h = Math.floor((ts - d * 86400000) / 3600000)
    const m = Math.floor((ts - d * 86400000 - h * 3600000) / 60000)
    const s = Math.floor((ts - d * 86400000 - h * 3600000 - m * 60000) / 1000)
    day = ""
    hour = ""
    minute = ""
    second = ""
    if (d == 1) {
        day = d + " day "
    } else if (d > 1) {
        day = d + " days "
    }
    if (h == 1) {
        hour = h + " hour "
    } else if (h > 1) {
        hour = h + " hours "
    }
    if (m == 1) {
        minute = m + " minute "
    } else if (m > 1) {
        minute = m + " minutes "
    }
    if (s == 1) {
        second = s + " second "
    } else if (s > 1) {
        second = s + " seconds "
    }
    if (day + hour + minute + second == "") {
        second = s + " seconds "
    }
    return day + hour + minute + second
}
global.randomArr = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}
global.save = function(data, file) {
    fs.writeFile(file, JSON.stringify(data), 'utf8', () => { })
}
global.trim = function(str, max) {
    (str.length > max ? `${str.slice(0, max - 3)}...` : str);
}
client.on('ready', () => {
    console.log('Logged in as ' + client.user.tag)
})

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, event.bind(null, client));
    });
  });
  
  client.commands = new Enmap();
  
  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      console.log(`Loading and deploying ${commandName}`);
      client.commands.set(commandName, props);
    });
  });

  client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(config.token);