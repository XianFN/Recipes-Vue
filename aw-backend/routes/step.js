const express = require("express");
const router = express.Router();

const stepsDAO = require("../database/models/stepDB.js");

router.get("/GetStepsById", function (req, res) {
  const id = req.query.id;

  stepsDAO
    .findAll({
      where: {
        recipeId: id,
      },
    })
    .then((respose) => {
      res.json(respose);
    });
});

router.post("/create", function (req, res) {
  stepsDAO
    .create({
      title: req.body.title,
      description: req.body.description,
      ordernum: req.body.ordernum,
      recipeId: req.body.recipeId,
    })
    .then((respose) => {
      res.json(respose);
    });
});

router.post("/delete", function (req, res) {
  stepsDAO
    .destroy({
      where: {
        recipeId: req.body.recipeId,
      },
    })
    .then((respose) => {
      res.json(respose);
    });
});

router.post("/deleteStep", function (req, res) {
    stepsDAO
      .destroy({
        where: {
          recipeId: req.body.recipeId,
          ordernum: req.body.num
        },
      })
      .then((respose) => {
        res.json(respose);
      });
  });

module.exports = router;
