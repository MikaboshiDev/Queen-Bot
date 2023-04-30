const { Schema, model } = require('mongoose');

let profile = new Schema({
    id: { type: String },
    badges: { type: Array }
});

module.exports = model('Profile Badges', profile);