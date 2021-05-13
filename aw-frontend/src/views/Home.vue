<template>
  <v-app
    id="inspire"
    v-bind:style="{ backgroundImage: 'url('+require('../assets/fondo2.jpg')+')' }"
  >
    <v-card class="mx-auto" width="70%" align="center" justify="center">
      <v-carousel cycle interval="3500" height="580">
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"

           v-bind:src= getdataImage(item.image)
          reverse-transition="fade-transition"
          transition="fade-transition"
            @click="$router.push({ name: 'ViewRecipe', params: {RecipeId: item.id} })"

            
            
        >
         <div class="display-3 .font-italic font-weight-medium" style="color: white">{{ item.name }}</div>
         </v-carousel-item>

        
        
         
      </v-carousel>
    </v-card>

    <br />
    <br />

    <v-card class="fluid" max-width="100%">
      <v-container fluid>
        <v-card-title>MIS RECETAS</v-card-title>

        <v-row dense>
          <v-col v-for="card in myRecipesArray" :key="card.name" :cols="2">
            <v-card>
              <v-img
                v-bind:src="'data:image/jpeg/png/jpg;base64,'+card.image"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
             
                @click="$router.push({ name: 'ViewRecipe', params: {RecipeId: card.id } })"
              >
                <v-card-title v-text="card.name"></v-card-title>
              </v-img>

              <v-card-actions>
                <v-rating
                  :value="card.media"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ml-4">{{card.media}} ({{card.peoplerating}})</div>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col>
            <v-card height="240px " max-width="300px">
              <v-img
                src="../assets/misrecetas.jpg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                @click="$router.push({ path: '/myRecipes' })"
              >
                <v-card-title v-text="tituloMisRecetas"></v-card-title>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <br />
    <br />
    <v-card class="fluid">
      <v-container fluid>
        <v-card-title>BUSQUEDA POR CATEGORIA</v-card-title>
        <v-row dense>
          <v-col v-for="card in categoriessArray" :key="card.name" :cols="2">
            <v-card>
              <v-img
                v-bind:src="'data:image/jpeg/png/jpg;base64,'+card.image"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                @click="$router.push({ name: 'ViewRecipe', params: {RecipeId: card.id } })"
              >
                <v-card-title v-text="card.name"></v-card-title>
              </v-img>

              <v-card-actions>
                <v-rating
                  :value="card.media"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ml-4">{{card.media}} ({{card.peoplerating}})</div>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col>
            <v-card height="240px " max-width="300px">
              <v-img
                src="../assets/category.jpg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                @click="$router.push({ name: 'SearchByCategory', params: {categoryName: categoryName} })"
              >
                <v-card-title v-text="tituloCategorias + categoryName"></v-card-title>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <br />
    <br />
    <v-card class="fluid">
      <v-container fluid>
        <v-card-title>BUSQUEDA POR INGREDIENTES</v-card-title>
        <v-row dense>
          <v-col v-for="card in ingredientsArray" :key="card.name" :cols="2">
            <v-card heigth="500px">
              <v-img
                v-bind:src="'data:image/jpeg/png/jpg;base64,'+card.image"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                @click="$router.push({ name: 'ViewRecipe', params: {RecipeId: card.id } })"
              >
                <v-card-title v-text="card.name"></v-card-title>
              </v-img>

              <v-card-actions>
                <v-rating
                  :value="card.media"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ml-4">{{card.media}} ({{card.peoplerating}})</div>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col>
            <v-card height="240px " max-width="300px">
              <v-img
                src="../assets/Ingredient.jpg"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                @click="$router.push({ name: 'SearchByIngredient', params: {ingredientName: ingredientName } })"
              >
                <v-card-title v-text="tituloIngredientes + ingredientName"></v-card-title>
              </v-img>
                
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-app>
</template>



<script>
const axios = require("axios");
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["userLoged"])
  },

  data: () => ({
    myRecipesArray: [],
    categoriessArray: [],
    allCategoriesArray: [],
    allIngredientsArray: [],
    ingredientsArray: [],
    tituloCategorias: "Ver mas recetas de : ",
    tituloIngredientes: "Ver mas recetas de : ",
    tituloMisRecetas: "Ver todas mis recetas: ",
    categoryName: "",
    defaultImageSrc: "../assets/default.jpg",
    ingredientName: "",
    items: [],
    logueado: "",
     slides: [],

    
  }),
  methods: {
          getdataImage: function(data){
            
              
              return 'data:image/jpeg/png/jpg;base64,'+data
          }
  },
  mounted() {
    if (this.userLoged === "null") {
      this.$router.push({ path: "/" });
    }
    axios

      .get("http://192.168.0.30:3000/category/GetAllCategories", {})
      .then(response => {
        // handle success
        this.allCategoriesArray = response.data;

        var i = Math.floor(Math.random() * this.allCategoriesArray.length);
        this.categoryName = this.allCategoriesArray[i].name;
        console.log("ARRAY DE CATEGORIAS");
        console.log(this.allCategoriesArray);

        axios

          .get(
            "http://192.168.0.30:3000/category_recipe/GetAllRecipesByIngredient",
            {
              params: {
                id: this.allCategoriesArray[i].id
              }
            }
          )
          .then(response => {
            // handle success

            var allIdOfRecipe2 = response.data;
            console.log("rec_cat");
            console.log(allIdOfRecipe2);
            allIdOfRecipe2.forEach(rec_cat => {
              axios

                .get("http://192.168.0.30:3000/recipe/GetRecipeById", {
                  params: {
                    id: rec_cat.recipeId
                  }
                })
                .then(response => {
                  // handle success
                  if (this.categoriessArray.length < 5) {
                    this.categoriessArray.push(response.data);
                  }
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
      }),
      //TODOS LOS INGREDIENTES
      axios

        .get("http://192.168.0.30:3000/ingredient/GetAllIngredient", {})
        .then(response => {
          // handle success
          this.allIngredientsArray = response.data;

          var i = Math.floor(Math.random() * this.allIngredientsArray.length);
          this.ingredientName = this.allIngredientsArray[i].name;

          axios

            .get(
              "http://192.168.0.30:3000/recipe_ingredients/GetAllRecipesByIngredient",
              {
                params: {
                  id: this.allIngredientsArray[i].id
                }
              }
            )
            .then(response => {
              // handle success

              var allIdOfRecipe = response.data;
              console.log(allIdOfRecipe);
              allIdOfRecipe.forEach(rec_ing => {
                axios

                  .get("http://192.168.0.30:3000/recipe/GetRecipeById", {
                    params: {
                      id: rec_ing.recipeId
                    }
                  })
                  .then(response => {
                    // handle success
                    if (this.ingredientsArray.length < 5) {
                      this.ingredientsArray.push(response.data);
                    }
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
        }),
      //BUSQUEDA DE MIS RECETAS
      console.log("id" + this.userLoged.id);
    axios
      .get("http://192.168.0.30:3000/user_recipe/GetAllRecipesByUserId", {
        params: {
          id: this.userLoged.id
        }
      })
      .then(response => {
        // handle success
        console.log("recipes user" + response.data);
        var recipes_user = response.data;

        recipes_user.forEach(rec_use => {
          axios

            .get("http://192.168.0.30:3000/recipe/GetRecipeById", {
              params: {
                id: rec_use.recipeId
              }
            })
            .then(response2 => {
              // handle success

              this.myRecipesArray.push(response2.data);
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

    axios
      .get("http://192.168.0.30:3000/recipe/getMostValoratedRecipes", {})
      .then(response => {
        //TODO QUITAR 5 pot 10
        for (var i = 0; i < 5; i++) {
          console.log(i);
          this.items.push(response.data[i]);
          this.slides.push(response.data[i].name)
        }
    
        console.log(this.items);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
