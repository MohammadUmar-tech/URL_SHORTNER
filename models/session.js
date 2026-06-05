const mongoose = require('mongoose');
const { User } = require('./signup'); 
const sessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    }
},{timestamps:true});
const Session = mongoose.model('session', sessionSchema);
module.exports = { Session };