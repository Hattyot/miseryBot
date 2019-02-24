module.exports = async (bot, member) => {
    if(bot.user.id === "548436033390379008") return
    console.log(member.user.tag)
    let welcomeMessage = `Welcome to Misery's Box <@${member.id}>! Please read the rules in <#524064741543641108>. If you have any questions, feel free to ask a staff member`;
    member.send(welcomeMessage)
};
