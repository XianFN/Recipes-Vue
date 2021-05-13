<template>
  <v-app
    id="inspire"
    v-bind:style="{ backgroundImage: 'url('+require('../assets/fondo2.jpg')+')' }"
  >
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-stepper v-model="e6" vertical>
              <v-stepper-step :complete="e6 > 1" step="1" :editable="editable">Datos personales</v-stepper-step>

              <v-stepper-content step="1">
                <v-card color="green" class="mb-12" height="500px">
                  <v-text-field label="Nombre" name="nombre" type="text" v-model="name"></v-text-field>

                  <v-text-field label="1º Apellido" name="surname" type="text" v-model="surname"></v-text-field>

                  <v-text-field label="2º Apellido" name="surname2" type="text" v-model="surname2"></v-text-field>

                  <v-text-field
                    label="Nombre de usuario"
                    name="userName"
                    type="text"
                    v-model="userName"
                  ></v-text-field>

                  <v-text-field label="Email" name="Email" type="text" v-model="email"></v-text-field>

                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="birthDate"
                        label="Picker without buttons"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="birthDate" @input="menu2 = false"></v-date-picker>
                  </v-menu>

                  <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Contraseña"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-card>
                <v-btn color="primary" @click="e6 = 2">Siguiente</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 2" step="2">Sobre ti</v-stepper-step>

              <v-stepper-content step="2">
                <v-card color="green" class="mb-12" height="200px">
                  <v-textarea
                    background-color="green"
                    color="cyan"
                    label="Pequeña descripcion"
                    v-model="about"
                  ></v-textarea>
                </v-card>
                <v-btn color="primary" @click="e6 = 3">Siguiente</v-btn>
                <v-btn @click="e6 = 1">Atras</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 3" step="3">Comprobacion</v-stepper-step>

              <v-stepper-content step="3">
                <v-card color="grey lighten-1" class="mb-12" height="500px">
                  <v-text-field label="Nombre" name="nombre" type="text" v-model="name"></v-text-field>

                  <v-text-field label="1º Apellido" name="surname" type="text" v-model="surname"></v-text-field>

                  <v-text-field label="2º Apellido" name="surname2" type="text" v-model="surname2"></v-text-field>

                  <v-text-field
                    label="Nombre de usuario"
                    name="userName"
                    type="text"
                    v-model="userName"
                  ></v-text-field>

                  <v-text-field label="Email" name="Email" type="text" v-model="email"></v-text-field>
                </v-card>
                <v-btn color="primary" @click="regist">Confirmar y registarse</v-btn>
                <v-btn @click="e6 = 2">Atras</v-btn>
              </v-stepper-content>
            </v-stepper>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
const axios = require("axios");

export default {
  data: () => ({
    show1: false,

    name: "",
    surname: "",
    surname2: "",
    userName: "",
    password: "",
    birthDate: new Date().toISOString().substr(0, 10),
    email: "",
    about: "",
    e6: 1,
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters"
    }
  }),
  methods: {
    regist() {
      //TODO cambiar por router push
      console.log("REGISTRAMOS");
      axios
        .get("http://192.168.0.30:3000/user/Register", {
          params: {
            name: this.name,
            surname: this.surname,
            surname2: this.surname2,
            userName: this.userName,
            birthDate: this.birthDate,
            email: this.email,
            about: this.about,
            password: this.password
          }
        })
        .then(response => {
          // handle success
          this.usuarios = response.data;
        })
        .catch(error => {
          // handle error
          console.log(error);
        });

      this.$router.push({ path: "/" });
    }
  },

  mounted() {
    var x = document.getElementById("div1");
    x.style.display = "none";

    
  }
};
</script>