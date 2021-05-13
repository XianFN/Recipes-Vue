const express = require("express");
const router = express.Router();

const ingredientDAO = require("../database/models/ingredientsDB.js");

router.get("/GetIngredientById", function (req, res) {
  const id = req.query.id;

  ingredientDAO.findByPk(id).then((respose) => {
    res.json(respose);
  });
}),


  router.get("/GetIngredientByName", function (req, res) {
    ingredientDAO
      .findOne({
        where: {
          name: req.query.name,
        },
      })
      .then((respose) => {
        res.json(respose);
      });
  }),


  router.get("/GetIdByName", function (req, res) {
    ingredientDAO
      .findOne({
        where: {
          name: req.query.name,
        },
      })
      .then((respose) => {
        res.json(respose.id);
      });
  }),


  router.get("/GetAllIngredient", function (req, res) {
    ingredientDAO.findAll().then((respose) => {
      res.json(respose);
    });
  });

router.post("/create", function (req, res) {
  ingredientDAO
    .create({
      name: req.body.name,
      calories: req.body.calories,
    })
    .then((respose) => {
      res.json(respose);
    });
});

module.exports = router;
