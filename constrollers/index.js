const express = require("express");
const { URL } = require("../models/schema");
const shortid = require("shortid");
const PORT=require('../PORT')
const {Session}=require('../models/session');
const { User } = require("../models/signup");



const handleCreationOfURLSHORTNER = async (req, res) => {
  try {
    const body = req.body;
    if (!body.url) {
      return res.status(400).json({ msg: "Invalid Request. Please provide a valid URL" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ msg: "Unauthorized. Please log in first." });
    }

    const shortId = shortid.generate();
    const reference = body.url;
    
   
    const already = await URL.findOne({ redirectUrl: reference });
    if (already) {
    
      const urls = await URL.find({ createdBy: req.user._id });
      return res.render('home', { urls, port: PORT });
    }


    await URL.create({
      shortId: shortId,
      redirectUrl: body.url,
      visitHistory: [],
      createdBy: req.user._id 
    });

    const urls = await URL.find({ createdBy: req.user._id });
    
    return res.render('home', { urls, port: PORT });

  } catch (error) {
    console.error("URL Shortener Error:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
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
