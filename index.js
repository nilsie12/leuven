const discord = require("discord.js");
const botdash = require("botdash.pro");
const botConfig = require("./botconfig.json");
const levelFile = require("./data/levels.json");


//  Command handler
const fs = require("fs");


const client = new discord.Client();
var dashboard = "";


//  Command handler
client.commands = new discord.Collection();


client.login(process.enz.token);



//  Command handler
fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        client.commands.set(fileGet.help.name, fileGet);
    });

});


client.on("guildMemberAdd", member => {

    // var role = member.guild.roles.cache.get('462166173690232842');

    // if (!role) return;

    // member.roles.add(role);



    var channel = member.guild.channels.cache.get('809054924117114890');

    if (!channel) return;

    // channel.send(`Welkom bij de server ${member}`);

    var joinEmbed = new discord.MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setDescription(`Hoi ${member.user.username}, **Welkom op de server**`)
        .setColor("#00FF00")
        .setFooter("Gebruiker gejoined")
        .setTimestamp();

    channel.send(joinEmbed);

});


client.on("guildMemberRemove", member => {

    var channel = member.guild.channels.cache.get('809054924117114890');

    if (!channel) return;

    var leaveEmbed = new discord.MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setColor("#FF0000")
        .setFooter("Gebruiker geleaved")
        .setTimestamp();

    channel.send(leaveEmbed);

});


client.on("ready", async () => {

    console.log(`${client.user.username} is online.`);

    client.user.setActivity("Leuven Roleplay", { type: "PLAYING" });

    dashboard = new botdash.APIclient(botConfig.botdash);

});


client.on("messageDelete", messageDeleted => {

    if (messageDeleted.author.bot) return;

    var content = messageDeleted.content;
    if (!content) content = "Geen tekst te vinden.";

    var response = `Bericht is verwijderd uit ${messageDeleted.channel}\n **Bericht:** ${content}`;

    var embed = new discord.MessageEmbed()
        .setAuthor(` ${messageDeleted.author.tag}`, `${messageDeleted.author.avatarURL({ size: 4096 })}`)
        .setDescription(response)
        .setTimestamp()
        .setColor("#FF0000");

    client.channels.cache.find(c => c.name == "logs").send(embed);

});


// var swearWords = ["koe", "kalf", "varken"];

client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefixes = JSON.parse(fs.readFileSync("./prefixes.json"));

    if (!prefixes[message.guild.id]) {
            prefixes[message.guild.id] = {
                prefix: botConfig.prefix
        };
    }

    var prefix = prefixes[message.guild.id].prefix;


    // var msg = message.content.toLowerCase();

    // for (let i = 0; i < swearWords["vloekwoorden"].length; i++) {

    //     if (msg.includes(swearWords["vloekwoorden"][i])) {

    //         message.delete();

    //         return message.reply("Gelieve niet te vloeken").then(msg => msg.delete({ timeout: 3000 }));

    //     }

    // }

    // var prefix = await dashboard.getVal(message.guild.id, "botprefix");


    // var prefix = botConfig.prefix;


    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    RandomXp(message);

    if (!message.content.startsWith(prefix)) return;

    //  Command handler
    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));



    if (commands) commands.run(client, message, arguments);

});

function RandomXp(message) {

    var randomNumber = Math.floor(Math.random() * 15) + 1;

    var idUser = message.author.id;

    if (!levelFile[idUser]) {
        levelFile[idUser] = {
            xp: 0,
            level: 0
        }
    }

    levelFile[idUser].xp += randomNumber;

    var levelUser = levelFile[idUser].level;
    var xpUser = levelFile[idUser].xp;

    var nextLevelXp = levelUser * 300;

    if (nextLevelXp == 0) nextLevelXp = 100;

    if (xpUser >= nextLevelXp) {
        levelFile[idUser].level += 1;

        fs.writeFile("./data/levels.json", JSON.stringify(levelFile), err => {
            if (err) console.log(err);
        });

        var embedLevel = new discord.MessageEmbed()
            .setDescription("***Level hoger***")
            .setColor("#00ff00")
            .addField("Nieuw level: ", levelFile[idUser].level);
        message.channel.send(embedLevel);

    }

}