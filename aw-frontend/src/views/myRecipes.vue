<template>
 <v-app id="inspire" v-bind:style="{ backgroundImage: 'url('+require('../assets/fondo2.jpg')+')' }">
  <v-container fluid>
    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar dark color="blue darken-3" class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            label="Search"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-select
            v-model="sortBy"
            flat
            solo-inverted
            hide-details
            :items="keys"
            label="Sort by"
          ></v-select>

          <v-spacer></v-spacer>
         
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
          <v-col v-for="item in props.items" :key="item.name" cols="12" sm="6" md="4" lg="3">
            <v-card>
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

              <v-list dense>
                <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                  <v-list-item-content :class="{ 'blue--text': sortBy === key }">{{ key }}:</v-list-item-content>
                  <v-list-item-content
                    class="align-end"
                    :class="{ 'blue--text': sortBy === key }"
                  >{{ item[key.toLowerCase()] }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="mt-2" align="center" justify="center">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn dark text color="primary" class="ml-2" v-on="on">
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

          <span class="mr-4 grey--text">Page {{ page }} of {{ numberOfPages }}</span>
          <v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
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
import {mapState} from 'vuex'
export default {
  props: [""],
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: "",

      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 8,
      sortBy: "",
  

      keys: [
        
        "foto",
        "countcalories",
        "people",
        "time"
      ],
      items: []
    };
  },
  mounted() {
   
    if (this.userLoged==='null') {
      this.$router.push({ path: '/' });
    }
 
    
   

  this.items=[]
    axios
      .get("http://192.168.0.30:3000/user_recipe/GetAllRecipesByUserId", {
        params:{
            id:  this.userLoged.id
        }
      })
      .then(response => {
      
        console.log(response.data);
        var arraydeidrecipe = response.data;


        arraydeidrecipe.forEach(idrecipe =>{


             axios

        .get("http://192.168.0.30:3000/recipe/GetRecipeById", {
          params: {
             
            id: idrecipe.recipeId
          }
        })
        .then(response => {
          // handle success
          this.items.push(response.data)
        })
        .catch(error => {
          // handle error
          console.log(error);
        })






        })  





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
    

    ...mapState(['userLoged'])
  

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