const discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Jij kan dit niet doen.");

    if (!args[0]) return message.reply("Gebruik: prefix <prefix>");

    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));

    prefixes[message.guild.id] = {
        prefix: args[0]
    };

    fs.writeFileSync("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err);
    });

    var embed = new discord.MessageEmbed()
        .setTitle("Prefix")
        .setColor("#ff0000")
        .setDescription(`Prefix is aangepast naar ${args[0]}`);

    message.channel.send(embed);

}

module.exports.help = {
    name: "prefix",
    description: "Pas de prefix aan van de bot.",
    category: "Staff commands"
}