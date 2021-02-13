const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var member = message.guild.member(message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(user => user.username.toLowerCase() == args.join(" ").toLowerCase()) || client.users.cache.find(user => user.tag.toLowerCase() == args.join(" ").toLowerCase()));

    if (!member) member = message.member;

    var embed = new discord.MessageEmbed()
        .setTitle(`Avatar ${member.user.username}`)
        .setColor("#00F7FF")
        .setImage(member.user.displayAvatarURL({ dynamic: true, size: 4096 }));

    message.channel.send(embed);

}

module.exports.help = {
    name: "avatar",
    description: "Zie je avatar in het groot.",
    category: "Fun"
}