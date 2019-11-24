const router = require("express").Router();

router.get("/", (req, res) => res.send("User Home"));

module.exports = router;