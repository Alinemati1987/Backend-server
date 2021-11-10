const express = require("express");
const { Router } = express;
const router = new Router();
const { user, space, story } = require("../models");
const auth = require("../auth/middleware");

// router.get("/spaces", (req, res) => {
//   res.send("Testing space router");
// });

router.get("/", async (req, res) => {
  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;
  const spaces = await space.findAndCountAll({
    limit,
    offset,
    include: [story],
    order: [[story, "createdAt", "DESC"]],
  });

  !spaces
    ? res.status(404).send("No space defined")
    : res.status(200).send({ message: "ok", spaces });
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(parseInt(id))) {
      return res.status(400).send({ message: "Space id is not a number" });
    }

    const specificSpace = await space.findByPk(id, {
      include: [{ model: story }],
      order: [[story, "createdAt", "DESC"]],
    });

    !specificSpace
      ? res.status(404).send("No space was found")
      : res.status(200).send({ message: "ok", specificSpace });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
