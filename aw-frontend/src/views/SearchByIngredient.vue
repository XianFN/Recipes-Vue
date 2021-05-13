<template>
 <v-app id="inspire" v-bind:style="{ backgroundImage: 'url('+require('../assets/fondo2.jpg')+')' }">
  <v-container fluid>
   
    
    <v-select  class="mt-9 pa-4" item-text="white" item-color="blue-grey  lighten-2" color="blue-grey  lighten-2" background-color="blue-grey  lighten-1"   solo-inverted hide-details  :items="ingredients" v-model=ingredient></v-select>

    <v-data-iterator

      :items="items"
      item-key="name"
      :items-per-page="12"
      :single-expand="expand"
      hide-default-footer
    >
      <template v-slot:default="{ items, isExpanded, expand }" >
        <v-row >
          <v-col v-for="item in items" :key="item.name" cols="12" sm="6" md="4" lg="3" >
            <v-card color="blue-grey  lighten-1" >
              <v-card-title  >
                <v-img
                   v-bind:src= "'data:image/jpeg/png/jpg;base64,'+item.image"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                  @click="$router.push({ name: 'ViewRecipe', params: {RecipeId: item.id } })"
                >
                  <v-card-title v-text="item.name"></v-card-title>
                </v-img>
              </v-card-title>
              <v-switch
                :input-value="isExpanded(item)"
                :label="isExpanded(item) ? 'Ver más' : 'Ver menos'"
                class="pl-4 mt-0"
                @change="(v) => expand(item, v)"
              ></v-switch>
              <v-divider></v-divider>
              <v-list v-if="isExpanded(item)" dense color="blue-grey  lighten-2">
                <v-list-item>
                  <v-list-item-content>Calorias:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.countcalories }} Kcal</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Comensales:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.people }}</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>Tiempo preparacion:</v-list-item-content>
                  <v-list-item-content class="align-end">{{ item.time }} minutos</v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-row align="center" class="mx-0">
                    <v-rating
                      :value="item.media"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="14"
                    ></v-rating>

                    <div class=" ml-4">{{item.media}} ({{item.peoplerating}})</div>
                  </v-row>
                </v-list-item>
               
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
   </v-app>
</template>

<script>
const axios = require("axios");
import { mapState } from "vuex";
export default {
  props: ["ingredientName"],
  data: () => ({
    expand: false,
    ingredients: [],
    ingredient:"Todos",
 
    items: []
  }),
  computed: {
    ...mapState(["userLoged"])
  },

  mounted() {
    if (this.userLoged === "null") {
      this.$router.push({ path: "/" });
    }
     if (this.ingredientName !== undefined) {
      console.log("FFF");
      this.ingredient = this.ingredientName;
    } else {
      this.items = [];
      axios
        .get("http://192.168.0.30:3000/recipe/getAllrecipes", {})
        .then(response => {
          console.log(response.data);
          this.items = response.data;
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    }
    axios
      .get("http://192.168.0.30:3000/ingredient/GetAllIngredient", {})
      .then(response => {
      
        this.ingredients.push("Todos")
        response.data.forEach(element => {
          this.ingredients.push(element.name);
         

        });
      })

      .catch(error => {
        // handle error
        console.log(error);
      });
  },
    watch: {
      ingredient: function(){
       this.items = [];
      console.log(this.ingredient);
      if (this.ingredient !== "Todos" && this.ingredient !== undefined) {
        this.items = [];
     
            axios
              .get("http://192.168.0.30:3000/ingredient/GetIngredientByName", {
                params: {
                  name: this.ingredient
                }
              })
              .then(response => {
                console.log("id ingrediente: ")
                console.log(response.data.id);
                 var idIngredient= response.data.id


                  axios
        .get(
          "http://192.168.0.30:3000/recipe_ingredients/GetAllRecipesByIngredient",
          {
            params: {
              id: idIngredient
            }
          }
        )
        .then(response2 => {
          console.log("todas las id de las recetas con el ingrediente: ");
          console.log(response2.data);
          var pocha = response2.data;

          pocha.forEach(element => {
            axios
              .get("http://192.168.0.30:3000/recipe/GetRecipeById", {
                params: {
                  id: element.recipeId
                }
              })
              .then(response3 => {
                console.log(response3.data);
                this.items.push(response3.data);
              })

              .catch(error => {
                // handle error
                console.log(error);
              });
          });
        })

        .catch(error => {
          // handle error
          console.log(error);
        });
    


              })

              .catch(error => {
                // handle error
                console.log(error);
              });
            
        
     





      }else{
        this.items = [];
      axios
        .get("http://192.168.0.30:3000/recipe/getAllrecipes", {})
        .then(response => {
          console.log(response.data);
          this.items = response.data;
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    
      }

      }



    }
 
  
};
</script>

