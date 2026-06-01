const express = require("express");
const { URL } = require("../models/schema");
const shortid = require("shortid");

const handleCreationOfURLSHORTNER = async (req, res) => {
  const body = req.body;
  if (!body.url)
    return res
      .status(400)
      .json({ msg: "Invalid Requirest Please provide valid credentials" });

  const shortId = shortid.generate();

  const result = await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  if (result) {
    return res.status(200).json({ msg: `success shortid is: ${shortId}` });
  }
  return res.status(500).json({ msg: "internal server Error" });
};
const hanleGetShortedURL = async (req, res) => {
  const shortId = req.params.shortId;

  if (!shortId)
    return res.status(400).json({ msg: "Please provide the shortid" });
  const result = await URL.findOneAndUpdate(
    { shortId },

    { $push: { visitHistory: { timestamp: Date.now() } } },
  );

  if (!result) return res.status(404).json({ msg: "URL not found" });
  return res.redirect(result.redirectUrl);
};

const handleGetAnalytics=async(req,res)=>{

const shortId=req.params.shortId
const result=await URL.findOne({shortId})
if(result){
    return res.status(200).json({totalClicks:result.visitHistory.length,
        analytics:result.visitHistory
    })
}
else{
    return res.status(404).json({msg:"URL not found"})
}

}



module.exports = {
  handleCreationOfURLSHORTNER,
  hanleGetShortedURL,
  handleGetAnalytics
};
