module.exports = async (bot, member) => {
    if(bot.user.id === "548436033390379008") return
    if(member.user.id === "297265801155575809") return member.ban()
    if(member.user.id === "302515290254606336") return member.ban()
    if(member.user.id === "297265801155575809") return member.ban()
    if(member.user.id === "423100380868509697") return member.ban()
    if(member.user.id === "257665936725770240") return member.ban()
    if(member.user.id === "531335658820730882") return member.ban()
    console.log(member.user.tag)
    let welcomeMessage = `Welcome to Misery's Box <@${member.id}>! Please read the rules in <#524064741543641108>. If you have any questions, feel free to ask a staff member`;
    member.send(welcomeMessage)
};
