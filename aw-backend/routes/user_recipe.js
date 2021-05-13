const express = require('express')
const router = express.Router()

const user_recipeDAO = require('../database/models/user_recipeDB.js')


router.get('/GetUserIdById',function(req,res){

    const id = req.query.id

    user_recipeDAO.findOne({
        where: {
            recipeId: id,
            created:1
            
            
        }
    })
    .then(respose => 
        
        {
         
       
            res.json(respose);
      
    })

}),

router.get('/GetAllRecipesByUserId',function(req,res){

    const id = req.query.id

    user_recipeDAO.findAll({
        where: {
            userId: id
            
            
            
        }
    })
    .then(respose => 
        
        {
         
       
            res.json(respose);
      
    })

})


router.post('/create', function (req, res) {
  

    user_recipeDAO.create({

        created: req.body.created,
        recipeId: req.body.recipeId,
        userId: req.body.userId,

    }) 
    .then(respose => 
        
        {
         
            res.json(respose);
      
    })


})

router.post('/delete', function (req, res) {
  

    user_recipeDAO.destroy({
        where: {
            recipeId: req.body.recipeId,
        }
    }) 
    .then(respose => 
        
        {
         
       
            res.json(respose);
      
    })

})

router.get("/addMyrecipes",function(req,res){




    user_recipeDAO.findOrCreate({
        where:{
            userId: req.query.userId,
            recipeId: req.query.recipeId
        },
        defaults:{
            created: 0
        }

    })
    .then(respose => 
        
        {
         
       
            res.json(respose);
      
    })
})


module.exports = router