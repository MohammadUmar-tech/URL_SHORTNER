const { Session } = require('../models/session');
const JWT=require('jsonwebtoken')
const {Secret}=require('../secret')
const {URL}=require('../models/schema')
const PORT=require('../PORT')
// const HandleLonggedInUserOnly = async (req, res, next) => {
//     try {
//         // const userCookie = req.cookies?.sessionId;

//         const userCookie=req.headers["authorization"]

//         if (!userCookie) return res.redirect('/login');
//         const token=userCookie.split("Bearer ")[1]
//         // const sessionDoc = await Session.findOne({ sessionId: userCookie }).populate('userId');
//         // if (!sessionDoc) return res.redirect('/login');

//         const sessionDoc=JWT.verify(token,Secret)
//         console.log("The Verifed Token ",sessionDoc)
//         if (!sessionDoc) return res.redirect('/login');

//         req.user = sessionDoc;
//         next(); 
//     } catch (error) {
//         console.error("Auth error:", error);
//         return res.redirect('/login');
//     }
// }

// const authStatus = async (req, res, next) => {
//     try {
//         const authHeader = req.headers["authorization"];
        
//         // If there's no auth header, respond with an error instead of breaking headers
//         if (!authHeader)
//             {
//             return res.status(401).json({ error: "Access denied. No token provided." });    
//             }

//         // 1. Properly extract the token
//         const token = authHeader.split("Bearer ")[1];
//         if (!token) return res.status(401).json({ error: "Malformed token header." });

//         // 2. FIXED: Verifying the extracted 'token', NOT 'userCookie'
//         const sessionDoc = JWT.verify(token, Secret);
//         if (!sessionDoc) return res.status(401).json({ error: "Invalid or expired token." });
//             console.log("The SessionDOC is ",sessionDoc)
//         req.user = sessionDoc._id;

//         // Fetch URLs created by this verified user
//         // const urls = await URL.find({ createdBy: sessionDoc._id });
        
//         // // 3. FIXED: Send the response and exit safely. (No next() belongs here!)
//         // return res.render('home', { urls, port: PORT });
//         next()

//     } catch (error) {
//         console.error("Auth status error:", error);
//         return res.status(401).json({ error: "Authentication failed." });
//     }
// }


const checkForAuthenticationHeader=async (req,res,next)=>{

    const userCookie = req.cookies?.sessionId

    if(!userCookie) return next()
        

        const sessionDoc=JWT.verify(userCookie,Secret)
        console.log("The Verifed Token ",sessionDoc)

    req.user=sessionDoc;
    return next()

}

const restrictTo= (roles=[])=>{

return function(req,res,next){
    if(!req.user) return res.redirect('/login')
        console.log("USER IS PRESENT")
    if(!roles.includes(req.user.role)) return res.end('Unauthorized Request')
        console.log("ROLE ALSO VERIFIED")
        return next()
}
}

module.exports = {
    checkForAuthenticationHeader,
    restrictTo
}



