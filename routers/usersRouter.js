const express = require("express");
const { Router } = express;
const router = new Router();

router.get("/", (req, res) => {
  res.send("Testing users router");
});

module.exports = router;
