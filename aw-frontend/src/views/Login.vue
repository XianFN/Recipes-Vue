<template>
  <v-app
    id="inspire"
    v-bind:style="{ backgroundImage: 'url('+require('../assets/fondo2.jpg')+')' }"
  >
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card
              class="elevation-12"
              v-bind:style="`background : linear-gradient(to bottom right,  white, #C2C2C2);`"
            >
              <v-toolbar color="#6BCE6B" dark flat>
                <v-toolbar-title>Iniciar sesión</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field label="Nombre de usuario" name="login" type="text" v-model="user"></v-text-field>

                  <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    label="Contraseña"
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                ¿No estás registrado?
                <router-link to="/Register">Registrarse</router-link>

                <v-spacer></v-spacer>

                <v-btn class="ma-2" color="secondary" @click="loginbtn">Iniciar Sesion</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
const axios = require("axios");





import { mapMutations } from "vuex";
export default {

  

 
  methods: {
    ...mapMutations(["setUserLogued"]),

    loginbtn() {
      console.log("Se ha pulsado el botón");
      console.log("username =" + this.user + " pass =" + this.password);
      axios
        .post("http://192.168.0.30:3000/user/login", {
          userName: this.user,
          password: this.password
        })
        .then(response => {
          if (response.data != "error") {
            console.log("Correcto");
            this.setUserLogued(response.data);
            localStorage.userid = response.data.id;
            console.log("LOCAL STORAGE: " + localStorage.userid);

            this.$router.push({ path: "/Home" });
          } else {
           alert("ERROR, no coinciden el usuario y contraseña en nuestra base de datos");
            console.log("Usuario no registrado");
          }
        })
        .catch(error => {
          console.log("ERROR");
             alert("ERROR, no coinciden el usuario y contraseña en nuestra base de datos");
          console.log(error);
        });
    },
    mounted() {
      this.setUserLogued("null");
    }
  },
  data: () => ({
    valid: true,
    loader: null,
    loading: false,

    user: "",
    password: "",
    
    show1: false,
  }),
  watch: {
    loader() {}
  }
};
</script>
<style>
.transparent {
  background-color: white !important;
  opacity: 0.65;
  border-color: transparent !important;
}
</style>