const express = require('express')
const app = express()

var bodyParser = require('body-parser')//Paquete para poder recibir peticiones POST
var cors = require('cors')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cors())




/**IMPORTAR RUTAS */

const user = require('./routes/user')
const recipe = require('./routes/recipes')
const ingredient = require('./routes/ingredients')
const category = require('./routes/category')
const commentary = require('./routes/comentary')
const step = require('./routes/step')
const category_recipe = require('./routes/category_recipe')
const recipe_ingredients = require('./routes/recipe_ingredients')
const user_recipe = require('./routes/user_recipe')






 app.use('/user',user)
 app.use('/recipe',recipe)
 app.use('/ingredient', ingredient)
 app.use('comentary', commentary)
 app.use('/category',category)
 app.use('/step',step)
 app.use('/category_recipe',category_recipe)
 app.use('/recipe_ingredients',recipe_ingredients)
 app.use('/user_recipe',user_recipe)


const server = app.listen(3000,function (){
    console.log("Recetas esta escuchando el puerto 3000");
})


