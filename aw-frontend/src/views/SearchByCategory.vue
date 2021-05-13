<template>
  <v-app
    id="inspire"
    v-bind:style="{ backgroundImage: 'url('+require('../assets/fondo2.jpg')+')' }"
  >
  <v-container fluid class="mt-9 pa-4" >
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
      color=" white"
      background-color="white"
    >
      <template v-slot:header>
        <v-toolbar dark color="blue-grey darken-1" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            color=" white"
            label="Busqueda"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-select v-model="sortBy" flat solo-inverted hide-details :items="keys" label="Ordenar por: "></v-select>

          <v-spacer></v-spacer>
          <v-select
            v-model="Categorias"
            flat
            solo-inverted
            hide-details
            :items="categories"
            label="Categorias"
          ></v-select>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed color="blue" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="blue" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-bind:style="`background : #6DA839;`"
          >
            <v-card color="blue-grey darken-1">
              <v-card-title>
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

              <v-divider></v-divider>

              <v-list dense color="blue-grey  lighten-1">
                <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                  <v-list-item-content
                    text
                    color="white"
                    :class="{ 'red--text': sortBy === key }"
                  >{{ key }}:</v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'white--text': sortBy === key }"
                  >{{ item[key.toLowerCase()] }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row
          class="mt-2 blue-grey darken-1"
          align="center"
          color="blue-grey darken-1"
          justify="center"
        >
          <span text color="white" class="ml-4">Recetas por página</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }" color="blue-grey darken-1">
              <v-btn dark text color="white" class="ml-2" v-on="on">
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span
            v-bind:style="'foreground: white'"
            class="mr-1"
          >Página {{ page }} de {{ numberOfPages }}</span>
          <v-btn fab dark color="blue darken-3" class="mr-5" @click="formerPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="blue darken-3" class="ml-0" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
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
  props: ["categoryName","searchData"],
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: "",
      stringpocho: "",
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 8,
      sortBy: "",
      categories: [],
      Categorias: "TODAS",

      keys: ["countcalories", "people", "time"],
      items: []
    };
  },
  mounted() {
    if (this.userLoged === "null") {
      this.$router.push({ path: "/" });
    }
     if (this.searchData !== undefined) {
      console.log("HAY ALGO EN BUSQUEDA");
      this.search = this.searchData;
    }
    if (this.categoryName !== undefined) {
      console.log("FFF");
      this.Categorias = this.categoryName;
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

    this.items = [];
    axios
      .get("http://192.168.0.30:3000/category/GetAllCategories", {})
      .then(response => {
        this.categories.push("TODAS");
        response.data.forEach(element => {
          this.categories.push(element.name);
        });
      })

      .catch(error => {
        // handle error
        console.log(error);
      });
  },

  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== `Name`);
    },

    ...mapState(["userLoged"])
  },
  watch: {
    Categorias: function() {
      this.items = [];
      console.log(this.Categorias);
      if (this.Categorias !== "TODAS" && this.Categorias !== undefined) {
        this.items = [];

        axios

          .get("http://192.168.0.30:3000/category/getCategoryByName", {
            params: {
              name: this.Categorias
            }
          })
          .then(response => {
            // handle success

            var idcategory = response.data.id;

            axios

              .get(
                "http://192.168.0.30:3000/category_recipe/GetAllRecipesByIngredient",
                {
                  params: {
                    id: idcategory
                  }
                }
              )
              .then(response => {
                // handle success

                var allIdOfRecipe2 = response.data;

                allIdOfRecipe2.forEach(rec_cat => {
                  axios

                    .get("http://192.168.0.30:3000/recipe/GetRecipeById", {
                      params: {
                        id: rec_cat.recipeId
                      }
                    })
                    .then(response => {
                      // handle success
                      this.items.push(response.data);
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
    }
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    }
  }
};
</script>