const express = require('express')
const router = express.Router()

const category_recipeDAO = require('../database/models/category_recipeDB.js')






router.get('/GetAllRecipesByIngredient',function(req,res){

   
    const id = req.query.id

    category_recipeDAO.findAll({
        where: {
            categoryId: id,
          
            
            
        }
    })
    .then(respose => 
        
        {
         
       
            res.json(respose);
      
    })

})

router.post('/create', function (req, res) {
  

    category_recipeDAO.create({

        recipeId: req.body.recipeId,
        categoryId: req.body.categoryId

    }) 
    .then(respose => 
        
        {
         
       
            res.json(respose);
      
    })


})

router.post('/delete', function (req, res) {
  

    category_recipeDAO.destroy({
        where: {
            recipeId: req.body.recipeId,
        }
    }) 
    .then(respose => 
        
        {
         
       
            res.json(respose);
      
    })

})

module.exports = router