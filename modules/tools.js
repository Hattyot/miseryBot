const { punishments } = require("./data.js")
module.exports = {
    punishmentsTools:  {
        add: (guild, userId, type, msg) => {
            punishments.find({}, (err, data) => {
                let newCaseNumber = data[0].caseNumber + 1
                let member = guild.members.get(userId)
                let newP = new punishments({
                    user_ID: member.user.id,
                    type: type,
                    message: msg,
                    time: Date.now(),
                    caseNumber: newCaseNumber
                });
                newP.save()
                    .then(r => console.log(r))
                    .catch(e => console.log(e));
            }).sort({caseNumber: -1})
        }
    }
};
