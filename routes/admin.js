require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Post = require("../models/post");
const User = require("../models/user")

const isLogged = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}

router.get("/", isLogged, (req, res, next) => {
    jwt.verify(req.token, process.env.PRIVATE_KEY, (err) => {
        if(err) {res.sendStatus(403)}
        else {
            Post.find().then(posts => res.json(posts))
        }
    })
})

router.post("/", isLogged, (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        text: req.body.text,
        timestamp: Date.now(),
        published: true,
        comments: []
    });

    post.save().then(post => res.json({post})).catch(err => console.log(err))
})

router.post("/login", (req, res, next) => {
    User.findOne().then(user => {
        const pass = bcrypt.compareSync(req.body.password, user.password);
        if(pass && req.body.username === user.username) {
            jwt.sign({user}, process.env.PRIVATE_KEY, {expiresIn: "1h"}, (err, token) => {
                if(err) {console.log(err)}
                res.send(token)
            })
        } else {
            console.log("Error logging in")
        }
    })
});

module.exports = router;