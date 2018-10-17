const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require('passport');
// import joi library for validation
const Joi = require('joi');
const News = require("../models/new");

/*
@Route : GET api/news/news
@Desc:  get all news
Access: private
*/

router.get("/news", (req, res, next) => {
  console.log('news list');
  News.find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

/*
@Route : POST api/news/add
@Desc:  add a news
Access: private
*/

router.post("/",passport.authenticate('jwt',{session:false}), (req, res, next) => {
  const news = new News({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    desc: req.body.desc,
    source: req.body.source,
    url:req.body.url


  });

// validate the input
  const validSchema = {
    title: Joi.string().required(),
    desc: Joi.string().required(),
    source: Joi.string().required(),
    url: Joi.string().required()

  }
  const isValid = Joi.validate(req.body,validSchema);
  if(isValid.error === null){
    news
    .save()
    .then(result => {
      if (result !== null) {
        res.status(200).json({
          message: "add a News done."
        });
      }
     
       
    })
    .catch(err => {
      console.log('add a News failed - ', err);
      res.status(500).json({
        error: err
      });
    });

  }else{
    console.log('add a news  failed - ',isValid.error.details[0].message);
    res.status(500).json({
      error: isValid.error.details[0].message
    });
  }
 
});

module.exports = router;