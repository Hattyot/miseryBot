const mongoose = require("mongoose");

levelSchema = mongoose.Schema({
    guild_ID: String,
    user_ID: String,
    xp: Number,
    level: Number
});

module.exports = {
    level: mongoose.model("level", levelSchema)
};