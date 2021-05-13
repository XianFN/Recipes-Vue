const express = require("express");
const router = express.Router();

const recipeDAO = require("../database/models/recipesDB.js");

router.get("/GetRecipeById", function (req, res) {
  const id = req.query.id;

  recipeDAO
    .findByPk(id)

    .then((respose) => {
      res.json(respose);
    });
}),
  router.get("/getAllrecipes", function (req, res) {
    recipeDAO
      .findAll()

      .then((respose) => {
        res.json(respose);
      });
  }),
  router.post("/create", function (req, res) {
    recipeDAO
      .create({
        name: req.body.name,
        image: req.body.image,
        countcalories: req.body.countcalories,
        people: req.body.people,
        time: req.body.time,
        totalrating: 0,
        peoplerating: 0,
        media: 0,
      })
      .then((respose) => {
        res.json(respose);
      });
  });

router.post("/delete", function (req, res) {
  recipeDAO
    .destroy({
      where: {
        id: req.body.id,
      },
    })
    .then((respose) => {
      res.json(respose);
    });
});

router.post("/changeName", function (req, res) {
    const nombre = req.query.name;
    const idrec = req.query.recipeId;
  
    recipeDAO
      .update({ name: nombre }, { where: { id: idrec } })
      .then((result) => res.json(req.query))
      .catch((err) => console.log(err));
  });

  router.post("/changePeople", function (req, res) {
    const comensales = req.query.people;
    const idrec = req.query.recipeId;
  
    recipeDAO
      .update({ people: comensales }, { where: { id: idrec } })
      .then((result) => res.json(req.query))
      .catch((err) => console.log(err));
  });

  router.post("/changeTime", function (req, res) {
    const tiempo = req.query.time;
    const idrec = req.query.recipeId;
  
    recipeDAO
      .update({ time: tiempo }, { where: { id: idrec } })
      .then((result) => res.json(req.query))
      .catch((err) => console.log(err));
  });



  router.get("/getMostValoratedRecipes", function (req, res) {
    console.log("BACK")
    recipeDAO
      .findAll({
        order:[
          ['media', 'DESC'],
        ]
      })
       

      .then((respose) => {
        res.json(respose);
      });
  }),

  

 

module.exports = router;
