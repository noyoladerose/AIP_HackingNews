const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//validation
const Joi = require("joi");
//encrpt password
const bcrypt = require("bcryptjs");
//sign the token
const jwt = require("jsonwebtoken");
//secret key as a salt for generating token
const key = require("../config/keys");

const User = require("../models/user");

/*
@Route : GET api/users/register
@Desc: User Login
Access: private
*/

router.post("/register", (req, res) => {
  const validSchema = {
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().required()
  };
  // compair password 1 && password 2
  const isValid = Joi.validate(req.body, validSchema);
  if (isValid.error === null) {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res
          .status(400)
          .json({ msg: "Email already exists.\n Please enter new email." });
      } else {
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json({ user }))
              .catch(err => console.log(err));
          });
        });
      }
    });
  } else {
    console.log("register user failed - ", isValid.error.details[0].message);
    res.status(500).json({
      error: isValid.error.details[0].message
    });
  }
});

/*
@Route : GET api/users/login
@Desc: User Login
Access: private
*/

router.post("/login", (req, res) => {

  const userName = req.body.email;
  const password = req.body.password;
  const errMSg = "User Name / Password is not match";
  //check if UserName is found
  User.findOne({ email: userName }).then(user => {
    if (!user) {
      return res.status(404).json({ msg: errMSg });
    }
    //compare password with hash
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // For security purposes, we have to sign the token to user
        const payload = { id: user._id, name: user.name, email: user.email }; // create JWT payload

        jwt.sign(payload, key.SecretKey, { expiresIn: 3600 }, (err, token) => {
          if (!err) {
            res.json({
              success: true,
              token: token,
              email: user.email,
              name: user.name
            });
          } else {
            console.log(err.name);
            res.json({ err: err.name });
          }
        });
        
      } else {
        res.status(404).json({ msg: errMSg });
      }
    });
  });
});


module.exports = router;
