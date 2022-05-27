const Discord = require("discord.js");

exports.run = async (client, message, args) => {

  let motivo = args.slice(" ").join(" ")
  if(!motivo) motivo = "O Autor deste comando não me informou o motivo."
      let avatar = message.author.avatarURL({ dynamic: true, format: "gif", size: 1024 });
            if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        const embed = new Discord.MessageEmbed()
        .setDescription(`${message.author}, :x: Você não tem permissão para usar este comando.`)
        return message.channel.send(embed);
      }
    message.delete();
    message.channel.createOverwrite(message.guild.id, {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true
    })
    const embed = new Discord.MessageEmbed()
    .setTitle('CHAT FOI ABERTO')
    .setDescription(`Este chat foi aberto.`)
    .addField('Fechar:', '(!!lock)', true)
    .addField('Aberto por:', `${message.author}`, true)
    .addField('Motivo:', motivo)
    .setTimestamp()
    .setThumbnail(avatar)
    .setColor('#1a73e8')
    message.channel.send(embed);
    
}
