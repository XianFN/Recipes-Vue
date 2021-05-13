<template>
  <v-app id="inspire"
  >
          

    <v-card
    color="blue-grey darken-1"
    dark>
        <v-card-title>
          <v-subheader>Seleccione una receta para eliminar</v-subheader>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-simple-table>
    <template v-slot:default>
      <thead >
        <tr>
          <th class="text-left">Nombre</th>
          <th class="text-left">Kcal</th>
          <th class="text-left">Valoración media</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in recipes" :key="item"
        >
          <td>{{ item.name }}</td>
           <td>{{ item.countcalories }}</td>
           <td>{{ item.media }}</td>
           <td><v-btn color="green darken-1" dark @click="eliminarCategoryRecipe(item.id)">Eliminar</v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
          </v-container>
        </v-card-text>
    
    <v-alert
      :value="alert"
      dismissible
      type="success"
      transition="scale-transition"
    >
      Receta eliminada con éxito.
    </v-alert>


      </v-card>


<v-divider></v-divider>



       <v-card
    color="blue-grey darken-1"
    dark>

        <v-card-title>
          <v-subheader>Crear una nueva categoria</v-subheader>
        </v-card-title>

<v-alert
      :value="alert2"
      dismissible
      type="success"
      transition="scale-transition"
    >
      Categoría añadida con éxito.
    </v-alert>


        <v-card-text>
          <v-container>
            <v-simple-table>
    <template v-slot:default>
      <thead >
        <tr>
          <th class="text-left">Nombre</th>
          <th class="text-left"></th>
          <th class="text-left"></th>
          <th class="text-left"></th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr 
        >
          <td><v-text-field
              dark
              v-model="name"
              color="blue-grey lighten-2"
              label="Introduzca el nombre de la nueva categoría"
            ></v-text-field></td>
            <td>    </td>
             <td>    </td>
              <td>    </td>
              
           <td><v-btn color="green darken-1" dark @click="crearCategoria()">Crear</v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
          </v-container>
        </v-card-text>

      </v-card>
  
  </v-app>
</template>

<script>
 const axios = require('axios')
 import {mapState} from 'vuex'
  export default {
    data () {
      return {
        recipes: [
        ],
        name: '',
        alert: false,
        alert2: false,
      }
      
    },
      computed:{

    ...mapState(['userLoged'])
  },
 
      methods: {

        crearCategoria() {
        var aux = { name: this.name, ammount: 0};

        axios
                      .post('http://192.168.0.30:3000/category/create', {
                        
                              name: aux.name,
                              ammount: aux.ammount
                         
                      })
                      .then(response =>{
                
                console.log(response);
            })
             .catch(error => {
        // handle error
        console.log(error);
      });      
      this.alerta2();
    },

    eliminarCategoryRecipe(item){
        axios
                      .post('http://192.168.0.30:3000/category_recipe/delete', {
                        
                              recipeId: item,
                         
                      })
                      .then(response =>{
                
                console.log(response);
            })
             .catch(error => {
        // handle error
        console.log(error);
      });      
      this.eliminarIngredientRecipe(item);
    },

     eliminarIngredientRecipe(item){
        axios
                      .post('http://192.168.0.30:3000/recipe_ingredients/delete', {
                        
                              recipeId: item,
                         
                      })
                      .then(response =>{
                
                console.log(response);
            })
             .catch(error => {
        // handle error
        console.log(error);
      });      
      this.eliminarPasos(item);
    },

    eliminarPasos(item){
        axios
                      .post('http://192.168.0.30:3000/step/delete', {
                        
                              recipeId: item,
                         
                      })
                      .then(response =>{
                
                console.log(response);
            })
             .catch(error => {
        // handle error
        console.log(error);
      });      
      this.eliminarUserRecipes(item);
    },

    eliminarUserRecipes(item){
        axios
                      .post('http://192.168.0.30:3000/user_recipe/delete', {
                        
                              recipeId: item,
                         
                      })
                      .then(response =>{
                
                console.log(response);
            })
             .catch(error => {
        // handle error
        console.log(error);
      });      
      this.eliminarRecipe(item);
    },

    eliminarRecipe(item){
        axios
                      .post('http://192.168.0.30:3000/recipe/delete', {
                        
                              id: item,
                         
                      })
                      .then(response =>{
                
                console.log(response);
            })
             .catch(error => {
        // handle error
        console.log(error);
      });      
      this.inicializarRecetas();
      this.alerta();
    },

           inicializarRecetas () { 
             this.recipes=[];
        axios
             .get("http://192.168.0.30:3000/recipe/getAllrecipes", {

             })
            .then(response =>{
              console.log(response.data);
                this.recipes=response.data;
                
            })
             .catch(error => {
        // handle error
        console.log(error);
      });      
     },


     alerta(){
          this.alert=true;
          setTimeout(() => { this.alert=false; }, 2000);
         
     },

      alerta2(){
          this.alert2=true;
          setTimeout(() => { this.alert2=false; }, 2000);
         
     },



      },
    mounted(){
     
    if (this.userLoged==='null') {
      this.$router.push({ path: '/' });
    }else if(this.userLoged.level<100){
      alert("Solo puedes acceder si eres administrador: NIVEL 100");
       this.$router.push({ path: '/Home' });
    }else{
        this.inicializarRecetas();
    }
 
  }
  }

</script>