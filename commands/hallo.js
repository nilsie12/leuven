const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    return message.channel.send("Hallo!!");

}

module.exports.help = {
    name: "hallo",
    description: "Laat de bot hallo zeggen.",
    category: "Fun"
}