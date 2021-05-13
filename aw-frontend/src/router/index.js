import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Register from "../views/Register";
import Home from "../views/Home";
import Create from "../views/Create";
import BarLogin from "../views/BarLogin";
import BarHome from "../views/BarHome";
import Help from "../views/Help";
import Admin from "../views/Admin";
import myRecipes from "../views/myRecipes";
import Profile from "../views/Profile";
import ViewRecipe from "../views/ViewRecipe";
import SearchByIngredient from "../views/SearchByIngredient";
import SearchByCategory from "../views/SearchByCategory";
import EditRecipe from "../views/EditRecipe";



Vue.use(VueRouter);

const routes = [
  {
    path: "/",

    redirect: 'Login'


  },

  {
    path: "/BarLogin",
    name: "BarLogin",
    component: BarLogin,


    children: [{
      path: '/Login',
      component: Login
    }, {
      path: '/Register',
      component: Register

    }]
  },
  {
    path: "/BarHome",



    name: "BarHome",
    component: BarHome,
    children: [{
      path: '/Home',
      component: Home
    }, {
      path: '/Profile',
      component: Profile
    },
    {
      path: '/Create',
      component: Create

    }, {
      path: '/MisRecetas',
      component: myRecipes
    },
    {
      path: '/SearchByIngredient',
      name: 'SearchByIngredient',
      component: SearchByIngredient,
      props: true
    },
    {
      path: '/EditRecipe',
      name: 'EditRecipe',
      component: EditRecipe,
      props: true
    },
    {
      path: '/SearchByCategory',
      name: 'SearchByCategory',
      component: SearchByCategory,
      props: true
    },
  
    
    {
      path: '/Help',
      component: Help
    }, {
      path: '/Admin',
      component: Admin
    }, {
      path: '/ViewRecipe/:RecipeId',
      name: 'ViewRecipe',
      component: ViewRecipe,
      props: true
    }]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
