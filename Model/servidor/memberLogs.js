const { Schema, model } = require('mongoose');
module.exports = model('MemberLogs', new Schema({
    Guild: String,
    logChannel: String,
    memberRole: String,
    botRole: String,
}))