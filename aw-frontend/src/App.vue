<template>

<!-- añadir bootstrap-->
  <v-app>
  

    <v-content>
      <router-view/><!--Carga el contenido de la ruta-->
    </v-content>

    
  </v-app>
</template>

<script>
const axios = require("axios");

import{mapMutations} from 'vuex';
export default {
  
  name: "App",

  components: {
    //
  },
 methods: {
         
  
          ...mapMutations(['setUserLogued']),
 },
  data: () => ({
    //
  }),
  beforeMount(){
    if (localStorage.userid!==undefined && localStorage.userid!=="null") {
   
      console.log("LOCAL STORAGE EN APP:VUE : "+localStorage.userid)
  var user = []
       axios
        .get("http://192.168.0.30:3000/user/GetUserById", {
          params:{
          id: localStorage.userid
         }
        })
        .then(response => {
        user= response.data
           console.log("USUARIO YA LOGUEADO:  "+ response.data.name);
        })
        .catch(error => {
          console.log("ERROR");
          console.log(error);
        });
         this.setUserLogued(user)
    }else{
      this.setUserLogued("null")
    }
    
  }
};
</script>
