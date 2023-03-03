const express = require('express'); 
const router = express.Router();
const {Blog,User,Comment} = require('../models');

// TODO: once home & login .handlebars are made, 1. check if user is logged in (if so, res.render home w/ appropriate data) else, res.render login w/ appropriate data
router.get("/",(req,res)=>{
        Blog.findAll(
                {include:[User, Comment],
                order: [["id", "DESC"]]},
                )
        .then((blogData) => {
                const hbsBlogs = blogData.map(blog => blog.toJSON());
                let username;
                if (req.session.userId) {
                        username = req.session.username
                }
                res.render("home", {
                        allBlogs: hbsBlogs,
                        username: username
                })
        })
})

router.get("/dashboard",(req,res)=>{
        if (!req.session.userId) {
                return res.render("login")
        }

        Blog.findAll(
                {include:[User, Comment],
                order: [["id", "DESC"]],
                where: {UserId:req.session.userId}
        },)
        .then((blogData) => {
                const hbsBlogs = blogData.map(blog => blog.toJSON());
                let username;
                if (req.session.userId) {
                        username = req.session.username
                }
                res.render("dashboard", {
                        allBlogs: hbsBlogs,
                        username: username
                })
        })
})

router.get("/signup", (req,res) => {
        res.render("signup")
})
// TODO figure this out
router.get("/logout", (req,res) => {
        Blog.findAll(
                {include:[User, Comment],
                order: [["id", "DESC"]]},
                )
        .then((blogData) => {
                req.session.destroy();
                const hbsBlogs = blogData.map(blog => blog.toJSON());
                let username;
                if (req.session.userId) {
                        username = req.session.username
                }
                res.render("home", {
                        allBlogs: hbsBlogs,
                        username: username ||"hadfhasdf"
                })
        })
})

module.exports = router;