const express = require("express");
const router = express.Router();

const userDAO = require("../database/models/usersDB.js");

router.post("/login", function (req, res) {
  const userName = req.body.userName;
  const password = req.body.password;

  userDAO
    .findOne({
      where: {
        userName: userName,
        password: password,
      },
    })
    .then((response) => {
      if (response != null) {
        res.json(response);
      } else {
        res.send("error");
      }
    });
});
router.get("/Register", function (req, res) {
  const name = req.query.name;
  const surname = req.query.surname;
  const surname2 = req.query.surname2;
  const userName = req.query.userName;
  const birthDate = req.query.birthDate;
  const email = req.query.email;
  const about = req.query.about;
  const password = req.query.password;




  userDAO.create({
    name: name,
    surname: surname,
    surname2: surname2,
    userName: userName,
    birthDate: birthDate,
    email: email,
    about: about,
    password: password,
    level: 0,
    experience: 0,
    recipes: 0,
    activationCode: 111111,
    activated: true



  })
    .then((response) => {
    
        res.json(response);
    
    });
});

router.get("/GetUserById", function (req, res) {
  const id = req.query.id;
  console.log("sdasdsadsadsadsadasd" + id);
  userDAO
    .findByPk(id)

    .then((respose) => {
      res.json(respose);
    });
});

router.post("/changeName", function (req, res) {
  //Query funciona tambien con post
  const nombre = req.query.name;
  const usuario = req.query.userName;

  userDAO
    .update({ name: nombre }, { where: { userName: usuario } })
    .then((result) => res.json(req.query))
    .catch((err) => console.log(err));
});

router.post("/changeSurName", function (req, res) {
  const apellido = req.query.surname;
  const usuario = req.query.userName;

  userDAO
    .update({ surname: apellido }, { where: { userName: usuario } })
    .then((result) => res.json(req.query))
    .catch((err) => console.log(err));
});

router.post("/changeSurName2", function (req, res) {
  const apellido = req.query.surname2;
  const usuario = req.query.userName;

  userDAO
    .update({ surname2: apellido }, { where: { userName: usuario } })
    .then((result) => res.json(req.query))
    .catch((err) => console.log(err));
});

router.post("/changeEmail", function (req, res) {
  const email = req.query.email;
  const usuario = req.query.userName;

  userDAO
    .update({ email: email }, { where: { userName: usuario } })
    .then((result) => res.json(req.query))
    .catch((err) => console.log(err));
});

module.exports = router;
