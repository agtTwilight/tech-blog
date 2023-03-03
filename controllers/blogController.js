const express = require('express');
const router = express.Router();
const { User, Blog, Comment } = require('../models');

// get all blogs
router.get("/", (req, res) => {
        Blog.findAll({include:[User, Comment]}).then(blogData => {
                res.json(blogData)
        }).catch(err => {
                console.log(err);
                res.status(500).json({ msg: "oh noes!", err })
        })
})

// get a single blog
router.get("/:id", (req, res) => {
        Blog.findByPk(req.params.id, {
                include: [User, Comment]
        }).then(blogData => {
                res.json(blogData)
        }).catch(err => {
                console.log(err);
                res.status(500).json({ msg: "oh noes!", err })
        })
})

// post blog
router.post("/", (req, res) => {
        if (!req.session.userId) {
                return res.status(403).json({ msg: "login first post" })
        }
        console.log(req.body);
        Blog.create({
                title: req.body.title,
                text: req.body.text,
                UserId: req.session.userId
        }).then(blogData => {
                res.json(blogData)
        }).catch(err => {
                console.log(err);
                res.status(500).json({ msg: "oh noes!", err })
        })
})

// delete blog
router.delete("/:id", (req, res) => {
        if (!req.session.userId) {
                return res.status(403).json({ msg: "login first post" })
        }
        console.log(req.body);
        Blog.findByPk(req.params.id).then(blogData => {
                if (!blogData) {
                        return res.status(404).json({ msg: "no such blog" })
                } else if (blogData.UserId !== req.session.userId) {
                        return res.status(403).json({ msg: "not your blog!" })
                }
                Blog.destroy({
                        where: {
                                id: req.params.id,
                        }
                }).then(blogData => {
                        res.json(blogData)
                }).catch(err => {
                        console.log(err);
                        res.status(500).json({ msg: "oh noes!", err })
                })
        }).catch(err => {
                console.log(err);
                res.status(500).json({ msg: "oh noes!", err })
        })
})

// update blog
router.put("/:id", (req, res) => {
        if (!req.session.userId) {
                return res.status(403).json({ msg: "login first post" })
        }
        console.log(req.body);
        Blog.findByPk(req.params.id).then(blogData => {
                if (!blogData) {
                        return res.status(404).json({ msg: "no such blog" })
                } else if (blogData.UserId !== req.session.userId) {
                        return res.status(403).json({ msg: "not your blog!" })
                }
                Blog.update(req.body, {
                        where: {
                                id: req.params.id,
                        }
                }).then(blogData => {
                        res.json(blogData)
                }).catch(err => {
                        console.log(err);
                        res.status(500).json({ msg: "oh noes!", err })
                })
        }).catch(err => {
                console.log(err);
                res.status(500).json({ msg: "oh noes!", err })
        })
})

module.exports = router;