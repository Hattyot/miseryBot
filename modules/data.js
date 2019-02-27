const mongoose = require("mongoose");

levelSchema = mongoose.Schema({
    guild_ID: String,
    user_ID: String,
    xp: Number,
    level: Number
});

moneySchema = mongoose.Schema({
    user_ID: String,
    onHand: Number,
    inBank: Number
});

raffleSchema = mongoose.Schema({
    user_ID: String,
    raffle_ID: Number
});

muteSchema = mongoose.Schema({
    user_ID: String,
    muteLength: Number,
    muteDate: Number
});

pointSchema = mongoose.Schema({
    user_ID: String,
    amount: Number
});

module.exports = {
    level: mongoose.model("level", levelSchema),
    money: mongoose.model("money", moneySchema),
    raffle:  mongoose.model("raffle", raffleSchema),
    mute: mongoose.model("mutes", muteSchema),
    points: mongoose.model("points", pointSchema)
};