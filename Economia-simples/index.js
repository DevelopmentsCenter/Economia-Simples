const Discord = require("discord.js");
const config = require("./config.json");
const bot = new Discord.Client({partials: ["MESSAGE", "USER", "REACTION"]});
const enmap = require ("enmap")
const express = require("express");


const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); // Recebe solicitações que o deixa online

//inicio de tudo

bot.on('message', message => {
  if (message.author.bot) return;
  if (message.channel.type == 'channel') return;
  if (!message.content.toLowerCase().startsWith(config.prefix)) return;
  if (message.content.startsWith(`<@!${bot.user.id}>`) || message.content.startsWith(`<@${bot.user.id}>`)) return;

  const args = message.content
    .trim().slice(config.prefix.length)
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    const commandFile = require(`./commands/${command}.js`)//puxando a pasta comands + o comando
    commandFile.run(bot, message, args);
  } catch (err) {
    const embed = new Discord.MessageEmbed()
    .setColor('PINK')
    .setDescription(`${message.author} :warning: O comando informado nao existe.`)
    return message.channel.send(embed);
  }
});

//mencione
bot.on("message", msg => {
  if(msg.content === `<@${bot.user.id}>`)
  msg.channel.send("**Meu prefixo é **`seu-prefixo`") 
})

bot.on("message", msg => {
  if(msg.content === `<@!${bot.user.id}>`)
  msg.channel.send("**Meu prefixo é **`seu-prefixo`") 
});

bot.on("ready", () => {
  let activities = [
    `Opa! Sou o Nome`, `Quer ajuda? seu-prefixohelp`
   ],
  i = 0;
  setInterval( () => 
  bot.user.setActivity(`${activities[i++ % activities.length]}`, {
       type:"WATCHING"
     }), 1000 * 60);
  bot.user
     .setStatus("online")
     .catch(console.error);
});

bot.login(config.token);