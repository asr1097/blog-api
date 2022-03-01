const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/", (req, res, next) => {
    Post.find().then(posts => res.json({posts}))
})

router.post("/", (req, res, next) => {
    const comment = {
        title: req.body.title,
        text: req.body.text,
        user: req.body.user,
        timestamp: Date.now()
    }

    Post.findByIdAndUpdate(req.body._id, {$push: {"comments": comment}}, {new: true})
        .then(doc => res.redirect("/api"))
        .catch(err => console.log(err))
})

module.exports = router;