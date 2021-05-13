const express = require("express");
const router = express.Router();

const recipe_ingredientDAO = require("../database/models/recipe_ingredients.js");

router.get("/GetRecipeIngredientById", function (req, res) {
  const id = req.query.id;

  recipe_ingredientDAO
    .findAll({
      where: {
        recipeId: id,
      },
    })
    .then((respose) => {
      res.json(respose);
    });
}),
  router.get("/GetAllRecipesByIngredient", function (req, res) {
    const id = req.query.id;
    console.log(id);
    recipe_ingredientDAO
      .findAll({
        where: {
          ingredientId: id,
        },
      })
      .then((respose) => {
        res.json(respose);
      });
  });

router.post("/create", function (req, res) {
  recipe_ingredientDAO
    .create({
      ammount: req.body.ammount,
      recipeId: req.body.recipeId,
      ingredientId: req.body.ingredientId,
    })
    .then((respose) => {
      res.json(respose);
    });
});

router.post("/delete", function (req, res) {
  recipe_ingredientDAO
    .destroy({
      where: {
        recipeId: req.body.recipeId,
      },
    })
    .then((respose) => {
      res.json(respose);
    });
});

router.post("/deleteOneIngredient", function (req, res) {
    recipe_ingredientDAO
      .destroy({
        where: {
          recipeId: req.body.recipeId,
          ingredientId: req.body.ingredientId
        },
      })
      .then((respose) => {
        res.json(respose);
      });
  });

module.exports = router;
