const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const Welcome = require("discord-welcome");


client.commands = new Discord.Collection();
client.events = new Discord.Collection();
['command_handler', 'event_handler'].forEach(handler => {
	require(`./handlers/${handler}`)(client, Discord);
})




client.once('ready', () => {
	client.user.setActivity("CDH 2022");
	Welcome(client, {
		publicmsg : "Hey @MEMBER, welcome to CDH 2022.",
		publicchannel : "1030089619280252949"
		})

	//server stats hi

	 const guild = client.guilds.cache.get('1030089618810490880');
	 const totalUsers = client.channels.cache.get('1030089619280252951');
	 const Participants = client.channels.cache.get('1030089619280252952');
	 setInterval(function () {
	 	console.log('Getting stats update..')
	 	var userCount = guild.memberCount;
	 	var participantCount = guild.roles.cache.get('1030089618810490882').members.size;
	 	console.log("Total Members: " + userCount);
	 	console.log("Participants: " + participantCount);
	 	totalUsers.setName("Total Members: " + userCount)
	 		.then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
	 		.catch(console.error);

	 	Participants.setName("Participants: " + participantCount)
	 		.then(newChannel => console.log(`Stat channel renamed to: ${newChannel.name}`))
	 		.catch(console.error);
	 }, 30000)
});


client.on('guildMemberAdd', member => {
	console.log('User ' + member.user.username + ' has joined the server!')
	var role = member.guild.roles.cache.find(role => role.name === 'Participant');
	member.roles.add(role)
  });


client.login(process.env.CDH2022_TOKEN);
