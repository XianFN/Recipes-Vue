const express = require('express')
const router = express.Router()

const categoryDAO = require('../database/models/categoryBD.js')


router.get('/GetAllCategories',function(req,res){

   

    categoryDAO.findAll({
        
    })
    .then(respose => 
        
        {
         
       
            res.json(respose);
      
    })

})


router.get('/getCategoryById',function(req,res){

    const id = req.query.id
   

    categoryDAO.findByPk(id)
    .then(respose => 
        
        {
         
       
            res.json(respose);
      
    })

}),

router.get('/getCategoryByName',function(req,res){

    const name = req.query.name
   

    categoryDAO.findOne({
        where: {
            name: name,
          
            
            
        }
    })
    .then(respose => 
        
        {
         
       
            res.json(respose);
      
    })

})

router.post('/create', function (req, res) {
  

    categoryDAO.create({
        name: req.body.name,
        ammount: req.body.ammount,
    }) 
    .then(respose => 
        
        {
         
       
            res.json(respose);
      
    })


})



module.exports = router