const { Session } = require('../models/session');

const HandleLonggedInUserOnly = async (req, res, next) => {
    try {
        const userCookie = req.cookies?.sessionId;
        if (!userCookie) return res.redirect('/login');

        const sessionDoc = await Session.findOne({ sessionId: userCookie }).populate('userId');
        if (!sessionDoc) return res.redirect('/login');

        req.user = sessionDoc.userId;
        // console.log("we are in the auth middleware ant the cookies is :",userCookie)
        next(); 
    } catch (error) {
        console.error("Auth error:", error);
        return res.redirect('/login');
    }
}

module.exports = {
    HandleLonggedInUserOnly
}