const discord = require("discord.js");
const fs = require("fs");
const canvaCord = require("canvaCord");

module.exports.run = async (client, message, args) => {

    const levelFile = JSON.parse(fs.readFileSync("./data/levels.json"));

    const member = message.member.id;

    var nextLevelXp = levelFile[member].level * 300;

    if (nextLevelXp == 0) nextLevelXp = 100;

    if(levelFile[member]){

        const rank = new canvaCord.Rank()
        .setAvatar(message.author.displayAvatarURL({dynamic: false, format: 'png'}))
        .setCurrentXP(levelFile[member].xp)
        .setLevel(levelFile[member].level)
        .setRequiredXP(nextLevelXp)
        .setStatus(message.author.presence.status)
        .setProgressBar("#00FF00", 'COLOR')
        .setUsername(message.author.username)
        .setDiscriminator(message.author.discriminator);

        rank.build().then(data => {
            const attachment = new discord.MessageAttachment(data, "level.png");
            message.channel.send(attachment);
        });

    } else{
        message.reply("We hebben nog geen gegevens.");
    }

}

module.exports.help = {
    name: "level",
    description: "Zie welk level je bent.",
    category: "Help"
}