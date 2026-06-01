const express = require("express");
const { URL } = require("../models/schema");
const shortid = require("shortid");
const PORT=require('../PORT')
const handleCreationOfURLSHORTNER = async (req, res) => {
  const body = req.body;
  if (!body.url)
    return res
      .status(400)
      .json({ msg: "Invalid Requirest Please provide valid credentials" });

  const shortId = shortid.generate();
  const refrence=body.url
  const already=await URL.findOne({redirectUrl:refrence})
  if(already){
    return res.status(400).send({mgs:"This URLalready Exist"})
  }
  const result = await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  if (result) {
    return res.render('home',{
      port:PORT,
      id:result.shortId
    });
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
}

module.exports = {
  handleCreationOfURLSHORTNER,
  hanleGetShortedURL,
  handleGetAnalytics
};
