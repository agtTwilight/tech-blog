const express = require('express');
const router = express.Router();

const userRoutes = require('./userController');
router.use("/api/users",userRoutes);

const blogRoutes = require('./blogController');
router.use("/api/blog",blogRoutes);

const commentRoutes = require('./commentController');
router.use("/api/comment",commentRoutes);

const frontEndRoutes = require('./frontEndController');
router.use("/",frontEndRoutes);

module.exports = router;