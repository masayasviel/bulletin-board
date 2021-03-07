const express = require("express");

const user = require("./servers/userServer");

const router = express.Router();

router.use("/user", user);

module.exports = router;