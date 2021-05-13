<template>
  <v-app
    id="inspire"
    v-bind:style="{ backgroundImage: 'url('+require('../assets/fondo2.jpg')+')' }"
  >
    <v-card :loading="loading" class="mx-auto my-12" max-width="900">
      <v-img height="400" v-bind:src= "'data:image/jpeg/png/jpg;base64,'+recipe.image" ></v-img>

      <v-card-title class="center" style="font-size:34px">{{recipe.name}}</v-card-title>

      <v-card-text>
        <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
          <v-btn class="ma-2" rounded @click="guardarReceta">Guardar Receta</v-btn>

      

          <v-btn
            class="ma-2"
            rounded
            outlined
            color="success"
            @click="$router.push({ name: 'EditRecipe', params: {RecipeId: recipe.id } })"
          >
            <v-icon left>mdi-pencil</v-icon>Editar receta
          </v-btn>
        </v-chip-group>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating :value="recipe.media" color="amber" dense half-increments readonly size="14"></v-rating>

          <div class="grey--text ml-4">{{recipe.media}} ({{recipe.peoplerating}})</div>
        </v-row>

        <div
          class="my-4 subtitle-1"
        >Tiempo de elaboracion: {{recipe.time}} minutos. Para {{recipe.people}} comensales</div>
        <div class="my-4 subtitle-1">Calorias aproximadas: {{recipe.calories}}</div>

        <div class="my-2 subtitle-1">Receta creada por : {{createdByName}}</div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>
      <v-card-title>Ingredientes</v-card-title>

      <div
        class="my-2 mx-5"
        v-for="ingredient in ingredients"
        :key="ingredient.id"
      >- {{ ingredient.name }} {{ingredient.calories}} g.</div>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Pasos</v-card-title>

      <div class="my-2 mx-5" v-for="step in steps" :key="step.id">
        <div class="font-weight-bold">{{ step.title }}</div>

        <div>{{step.description}}</div>
        <br />
      </div>
    </v-card>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
const axios = require("axios");
export default {
  props: ["RecipeId"],
  data: () => ({
    loading: false,
    selection: 1,
    recipe: "",
    blob2: "",
    ingredients: [],
    ingredients_recipe: [],
    steps: [],
    createdByName: "",
    image:"",
    createdById: ""
  }),

  methods: {
    guardarReceta() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);

      axios
        .get("http://192.168.0.30:3000/user_recipe/addMyrecipes", {
          params: {
            userId: this.userLoged.id,
            recipeId: this.RecipeId
          }
        })
        .then(response => {
          // handle success
          console.log(
            "añadido correctamente con la id " + response.data.recipeId
          );
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    }
  },
  computed: {
    
    ...mapState(["userLoged"])
  },

  mounted() {
    if (this.userLoged === "null") {
      this.$router.push({ path: "/" });
    }

    axios
      .get("http://192.168.0.30:3000/recipe/GetRecipeById", {
        params: {
          id: this.RecipeId
        }
      })
      .then(response => {
        // handle success
        console.log("recipe");
        this.recipe = response.data;
        this.blob2 = response.data.image;
        this.image= new Buffer(response.data.image).toString('base64')
      })
      .catch(error => {
        // handle error
        console.log(error);
      });

    axios

      .get("http://192.168.0.30:3000/recipe_ingredients/GetRecipeIngredientById", {
        params: {
          id: this.RecipeId
        }
      })
      .then(response => {
        // handle success
        console.log("recipe ingredient" + response.data);
        this.ingredients_recipe = response.data;

        console.log(this.ingredients_recipe);
        this.ingredients_recipe.forEach(ing_rec => {
          axios

            .get("http://192.168.0.30:3000/ingredient/GetIngredientById", {
              params: {
                id: ing_rec.ingredientId
              }
            })
            .then(response2 => {
              // handle success
              var ingredient2 = response2.data;
              ingredient2.calories = ing_rec.ammount;
              this.ingredients.push(ingredient2);
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
      }),
      axios

        .get("http://192.168.0.30:3000/step/GetStepsById", {
          params: {
            id: this.RecipeId
          }
        })
        .then(response => {
          // handle success
          this.steps = response.data;
        })
        .catch(error => {
          // handle error
          console.log(error);
        }),
      axios
        .get("http://192.168.0.30:3000/user_recipe/GetUserIdById", {
          params: {
            id: this.RecipeId
          }
        })
        .then(response => {
          // handle success

          this.createdById = response.data.userId;
          console.log(this.createdById);
          axios
            .get("http://192.168.0.30:3000/user/GetUserById", {
              params: {
                id: this.createdById
              }
            })
            .then(response => {
              // handle success

              this.createdByName = response.data.userName;
              console.log(this.createdByName + " data " + response.data);
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
  }
};
</script>