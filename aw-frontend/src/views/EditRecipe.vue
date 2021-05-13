<template>
  <v-app
    id="inspire"
    v-bind:style="{
      backgroundImage: 'url(' + require('../assets/fondo2.jpg') + ')',
    }"
  >
    <v-card max-width="375" class="mx-auto">
      <v-img
        src="https://images.vexels.com/media/users/3/156607/isolated/preview/706601b105716899ac6810b84e9bf362-chef-cara-icono-plana-by-vexels.png"
        height="300px"
        dark
      >
        <v-row class="fill-height">
          <v-card-title class="white--text pl-12 pt-12"> </v-card-title>
        </v-row>
      </v-img>

      <v-list two-line>
        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ recipe.name }}</v-list-item-title>
            <v-list-item-subtitle>Nombre de la receta</v-list-item-subtitle>
          </v-list-item-content>
          <div class="text-center">
            <v-btn
              color="green darken-1"
              class="ma-2"
              dark
              @click="dialog = true"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-form ref="form" lazy-validation>
                  <v-text-field
                    label="Nombre"
                    name="name"
                    type="text"
                    v-model="name"
                  ></v-text-field>
                </v-form>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="changenamebtn">
                    Aceptar
                  </v-btn>
                  <v-btn color="green darken-1" dark @click="dialog = false"
                    >Cancelar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              >{{ recipe.people }} comensales</v-list-item-title
            >
            <v-list-item-subtitle>Para cuantos comensales</v-list-item-subtitle>
          </v-list-item-content>
          <div class="text-center">
            <v-btn
              color="green darken-1"
              class="ma-2"
              dark
              @click="dialogs = true"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-dialog v-model="dialogs" max-width="500px">
              <v-card>
                <v-form ref="form" lazy-validation>
                  <v-text-field
                    label="Comensales"
                    name="comensales"
                    type="number"
                    v-model="comensales"
                  ></v-text-field>
                </v-form>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="changepeoplebtn">
                    Aceptar
                  </v-btn>
                  <v-btn color="green darken-1" dark @click="dialogs = false"
                    >Cancelar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ recipe.time }} minutos</v-list-item-title>
            <v-list-item-subtitle>Tiempo de elaboracion</v-list-item-subtitle>
          </v-list-item-content>
          <div class="text-center">
            <v-btn
              color="green darken-1"
              class="ma-2"
              dark
              @click="dialogs2 = true"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-dialog v-model="dialogs2" max-width="500px">
              <v-card>
                <v-form ref="form" lazy-validation>
                  <v-text-field
                    label="Tiempo"
                    name="tiempo"
                    type="number"
                    v-model="tiempo"
                  ></v-text-field>
                </v-form>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="changetimebtn">
                    Aceptar
                  </v-btn>
                  <v-btn color="green darken-1" dark @click="dialogs2 = false"
                    >Cancelar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-list-item>

        <v-divider></v-divider>
      </v-list>
    </v-card>

    <v-card
      class="mx-auto my-12"
      max-width="900"
      :key="compKey"
    >
      <v-divider class="mx-4"></v-divider>
      <v-card-title
        ><v-btn
          @click="dialognuevoing = true"
          class="mx-1"
          fab
          dark
          x-small
          color="green darken-1"
        >
          <v-icon dark>mdi-plus</v-icon> </v-btn
        ><v-btn
          class="mx-1"
          fab
          dark
          x-small
          color="red"
          @click="dialogdeleteing = true"
        >
          <v-icon dark>mdi-minus</v-icon> </v-btn
        >Ingredientes</v-card-title
      >

      <v-dialog v-model="dialogdeleteing" max-width="500px">
        <v-card>

          <v-autocomplete
            v-model="selectedIngredientDel"
            :items="ingredientes"
            filled
            background-color="white"
            chips
            label="Seleccionar ingrediente"
            item-text="name"
            item-value="name"
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
                @click:close="remove(data.item)"
                
              >
                {{ data.item.name }}
              </v-chip>
            </template>

            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
              </template>
              <template v-else>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="data.item.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="data.item.calories + ' kcal'"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="deleteingbtn">
              Aceptar
            </v-btn>
            <v-btn color="green darken-1" dark @click="dialogdeleteing = false"
              >Cancelar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialognuevoing" max-width="500px">
        <v-card>
          
          <v-form ref="form" lazy-validation>
            <v-text-field
              label="Gramos"
              filled
              background-color="white"
              name="grams"
              type="number"
              v-model="grams"
            ></v-text-field>
          </v-form>

          <v-autocomplete
            v-model="selectedIngredient"
            :items="ingredientes"
            filled
            background-color="white"
            chips
            label="Seleccionar ingrediente"
            item-text="name"
            item-value="name"
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
                @click:close="remove(data.item)"
              >
                {{ data.item.name }}
              </v-chip>
            </template>

            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
              </template>
              <template v-else>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="data.item.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="data.item.calories + ' kcal'"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="nuevoingbtn">
              Aceptar
            </v-btn>
            <v-btn color="green darken-1" dark @click="dialognuevoing = false"
              >Cancelar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div
        class="my-2 mx-5"
        v-for="ingredient in ingredients"
        :key="ingredient.id"
      >
        {{ ingredient.name }} {{ ingredient.calories }} g.
      </div>

      <v-divider class="mx-4"></v-divider>

      <v-card-title
        ><v-btn
          @click="dialog5 = true"
          class="mx-1"
          fab
          dark
          x-small
          color="green darken-1"
        >
          <v-icon dark>mdi-plus</v-icon> </v-btn
        ><v-btn
          class="mx-1"
          fab
          dark
          x-small
          color="red"
          @click="dialogpaso = true"
        >
          <v-icon dark>mdi-minus</v-icon> </v-btn
        >Pasos</v-card-title
      >

      <v-dialog v-model="dialog5" max-width="500px">
        <v-card>
          <v-form ref="form" lazy-validation>
            <v-text-field
              label="Nombre del paso"
              name="stepname"
              type="text"
              v-model="stepname"
            ></v-text-field>
          </v-form>

          <v-form ref="form" lazy-validation>
            <v-text-field
              label="Descripción del paso"
              name="stepdesc"
              type="text"
              v-model="stepdesc"
            ></v-text-field>
          </v-form>

          <v-form ref="form" lazy-validation>
            <v-text-field
              label="Número de paso"
              name="orden"
              type="number"
              v-model="orden"
            ></v-text-field>
          </v-form>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="createstepbtn">
              Aceptar
            </v-btn>
            <v-btn color="green darken-1" dark @click="dialog5 = false"
              >Cancelar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogpaso" max-width="500px">
        <v-card>
          <v-form ref="form" lazy-validation>
            <v-text-field
              label="Número de paso"
              name="number"
              type="number"
              v-model="numerodelete"
            ></v-text-field>
          </v-form>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="deletestepbtn">
              Aceptar
            </v-btn>
            <v-btn color="green darken-1" dark @click="dialogpaso = false"
              >Cancelar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <div class="my-2 mx-5" v-for="step in steps" :key="step.id">
        <div class="font-weight-bold">
          {{ step.title }}
        </div>
        <div>{{ step.description }}</div>
        <br />
      </div>
    </v-card>
  </v-app>
</template>

<script>
const axios = require("axios");
import { mapState } from "vuex";
export default {
  props: ["RecipeId"],
  computed: {
    ...mapState(["userLoged"]),
    user() {
      return this.userLoged;
    },
  },
  data: () => ({
    dialog: false,
    dialog2: false,
    dialog3: false,
    dialogs: false,
    dialogs2: false,
    dialog4: false,
    dialog5: false,
    dialognuevoing: false,
    dialogpaso: false,
    dialogdeleteing: false,
    ingrname: "",
    cuantity: "",
    notifications: false,
    sound: true,
    name: "",
    comensales: "",
    tiempo: "",
    recipe: [],
    email: "",
    on: "",
    widgets: false,
    selection: 1,
    blob2: "",
    ingredients: [],
    ingredients_recipe: [],
    steps: [],
    createdByName: "",
    createdById: "",
    stepname: "",
    stepdesc: "",
    orden: "",
    numerodelete: "",
    compKey: 0,
    selectedIngredient: "",
    grams: "",
    idIngrEdit: "",
    idIngrDel: "",
    selectedIngredientDel: "",
    ingredientes: ""
  }),

  mounted() {
    console.log(this.userLoged.name);
    if (this.userLoged === "null") {
      this.$router.push({ path: "/" });
    }

    axios
      .get("http://192.168.0.30:3000/ingredient/GetAllIngredient", {})
      .then((response) => {
        this.ingredientes = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://192.168.0.30:3000/recipe/GetRecipeById", {
        params: {
          id: this.RecipeId,
        },
      })
      .then((response) => {
        // handle success
        console.log("recipe");
        this.recipe = response.data;
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

    axios
      .get("http://192.168.0.30:3000/recipe/GetRecipeById", {
        params: {
          id: this.RecipeId,
        },
      })
      .then((response) => {
        // handle success
        console.log("recipe");
        this.recipe = response.data;
        this.blob2 = response.data.image;
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });

    axios
      .get("http://192.168.0.30:3000/recipe_ingredients/GetRecipeIngredientById", {
        params: {
          id: this.RecipeId,
        },
      })
      .then((response) => {
        // handle success
        console.log("recipe ingredient" + response.data);
        this.ingredients_recipe = response.data;

        console.log(this.ingredients_recipe);
        this.ingredients_recipe.forEach((ing_rec) => {
          axios

            .get("http://192.168.0.30:3000/ingredient/GetIngredientById", {
              params: {
                id: ing_rec.ingredientId,
              },
            })
            .then((response2) => {
              // handle success
              var ingredient2 = response2.data;
              ingredient2.calories = ing_rec.ammount;
              this.ingredients.push(ingredient2);
            })
            .catch((error) => {
              // handle error
              console.log(error);
            });
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      }),
      axios

        .get("http://192.168.0.30:3000/step/GetStepsById", {
          params: {
            id: this.RecipeId,
          },
        })
        .then((response) => {
          // handle success
          this.steps = response.data;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        }),
      axios
        .get("http://192.168.0.30:3000/user_recipe/GetUserIdById", {
          params: {
            id: this.RecipeId,
          },
        })
        .then((response) => {
          // handle success

          this.createdById = response.data.userId;
          console.log(this.createdById);
          axios
            .get("http://192.168.0.30:3000/user/GetUserById", {
              params: {
                id: this.createdById,
              },
            })
            .then((response) => {
              // handle success

              this.createdByName = response.data.userName;
              console.log(this.createdByName + " data " + response.data);
            })
            .catch((error) => {
              // handle error
              console.log(error);
            });
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
  },

  methods: {
    changenamebtn() {
      console.log("Se ha pulsado el botónes");
      this.recipe.name = this.name;
      axios
        .post(
          "http://192.168.0.30:3000/recipe/changeName?name="
            .concat(this.name)
            .concat("&recipeId=")
            .concat(this.RecipeId)
        )
        .then((respose) => {
          console.log(respose);
        })
        .catch((error) => {
          console.log("ERROR");
          console.log(error);
        });
      this.dialog = false;
    },

    changepeoplebtn() {
      console.log("Se ha pulsado el botónes");
      this.recipe.people = this.comensales;
      axios
        .post(
          "http://192.168.0.30:3000/recipe/changePeople?people="
            .concat(this.comensales)
            .concat("&recipeId=")
            .concat(this.RecipeId)
        )
        .then((respose) => {
          console.log(respose);
        })
        .catch((error) => {
          console.log("ERROR");
          console.log(error);
        });
      this.dialogs = false;
    },

    changetimebtn() {
      console.log("Se ha pulsado el botónes");
      this.recipe.time = this.tiempo;
      axios
        .post(
          "http://192.168.0.30:3000/recipe/changeTime?time="
            .concat(this.tiempo)
            .concat("&recipeId=")
            .concat(this.RecipeId)
        )
        .then((respose) => {
          console.log(respose);
        })
        .catch((error) => {
          console.log("ERROR");
          console.log(error);
        });
      this.dialogs2 = false;
    },

    createstepbtn() {
      console.log("Se ha pulsado el botónes");
      axios
        .post("http://192.168.0.30:3000/step/create", {
          title: this.stepname,
          description: this.stepdesc,
          ordernum: this.orden,
          recipeId: this.RecipeId,
        })
        .then((respose) => {
          console.log(respose);
        })
        .catch((error) => {
          console.log("ERROR");
          console.log(error);
        });
      this.dialog5 = false;
    },

    deletestepbtn() {
      console.log("Se ha pulsado el botónes");
      axios
        .post("http://192.168.0.30:3000/step/deleteStep", {
          recipeId: this.RecipeId,
          num: this.numerodelete,
        })
        .then((respose) => {
          console.log(respose);
        })
        .catch((error) => {
          console.log("ERROR");
          console.log(error);
        });
      this.dialogpaso = false;
    },

    nuevoingbtn() {
      console.log("Se ha pulsado el botónes");
      axios
        .get("http://192.168.0.30:3000/ingredient/GetIdByName", {
          params: {
            name: this.selectedIngredient,
          },
        })
        .then((respose) => {
          this.idIngrEdit = respose.data;

          console.log("Se ha pulsado el botónes");
          axios
            .post("http://192.168.0.30:3000/recipe_ingredients/create", {
              ammount: this.grams,
              recipeId: this.RecipeId,
              ingredientId: this.idIngrEdit,
            })
            .then((respose) => {
              console.log(respose.data);
            })
            .catch((error) => {
              console.log("ERROR");
              console.log(error);
            });
        })
        .catch((error) => {
          console.log("ERROR");
          console.log(error);
        });
      this.dialognuevoing = false;
    },

    deleteingbtn() {
      console.log("Se ha pulsado el botónes");
      axios
        .get("http://192.168.0.30:3000/ingredient/GetIdByName", {
          params: {
            name: this.selectedIngredientDel,
          },
        })
        .then((respose) => {
          this.idIngrDel = respose.data;

          console.log("Se ha pulsado el botónes");
          axios
            .post(
              "http://192.168.0.30:3000/recipe_ingredients/deleteOneIngredient",
              {
                recipeId: this.RecipeId,
                ingredientId: this.idIngrDel,
              }
            )
            .then((respose) => {
              console.log(respose.data);
            })
            .catch((error) => {
              console.log("ERROR");
              console.log(error);
            });
        })
        .catch((error) => {
          console.log("ERROR");
          console.log(error);
        });
      this.dialogdeleteing = false;
    },
  },
};
</script>
