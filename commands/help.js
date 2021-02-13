const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async (client, message, args) => {

    // try {

    //     var text = "**__Leuven bot Commands__** \n\n **Fun:** \n /hallo - Zegt hallo terug. \n\n **Help commands:** \n /botinfo - Geeft de info van de bot. \n /serverinfo - Geeft de info van de server. \n /help - Geeft dit menu. \n\n **Staff Commmands** \n /kick - Kick iemand. \n /clear - Verwijder een aantal berichten."

    //     message.author.send(text);

    //     message.reply("Alle commands kan je vinden in je prive berichten.");

    // } catch (error) {
    //     message.reply("Er is een fout.")
    // }

    var commandList = [];
    var prefix = botConfig.prefix;

    client.commands.forEach(command => {

        var constructor = {

            name: command.help.name,
            description: command.help.description,
            category: command.help.category

        }

        commandList.push(constructor)
        
    });

    var response = "**__Leuven Bot Commands__**\n\n";
    var fun = "**__Fun__**\n";
    var help = "\n**__Hulp__**\n";
    var staff = "\n**__Staff Commands__**\n";

    for (let i = 0; i < commandList.length; i++) {
        const command = commandList[i];

        if(command["category"] == "Fun"){

            fun += `${prefix}${command["name"]} - ${command["description"]}\n`;

        } else if(command["category"] == "Help"){

            help += `${prefix}${command["name"]} - ${command["description"]}\n`;

        } else if(command["category"] == "Staff commands"){

            staff += `${prefix}${command["name"]} - ${command["description"]}\n`;
        }
        
    }

    response += fun;
    response += help;
    response += staff;

    message.author.send(response).then(() => {
        message.channel.send("Alle commands staan in je privé berichten! :mailbox_with_mail:");
    }).catch(() => {
        message.channel.send("Je privé berichten staan uit, dus je hebt niks ontvangen.");
    })


}

module.exports.help = {

    name: "help",
    description: "Geeft dit menu.",
    category: "Help"

}