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
        <v-list-item>
          {{ this.userLoged.userName }}
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="green darken-2">mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ this.userLoged.name }}</v-list-item-title>
            <v-list-item-subtitle>Nombre</v-list-item-subtitle>
          </v-list-item-content>
          <div class="text-center">
            <v-btn color="green darken-1" class="ma-2" dark @click="dialog = true">
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

        <v-list-item>
          <v-list-item-icon> </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ this.userLoged.surname }}</v-list-item-title>
            <v-list-item-subtitle>Primer apellido</v-list-item-subtitle>
          </v-list-item-content>
          <div class="text-center">
            <v-btn color="green darken-1" class="ma-2" dark @click="dialogs = true">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-dialog v-model="dialogs" max-width="500px">
              <v-card>
                <v-form ref="form" lazy-validation>
                  <v-text-field
                    label="Primer apellido"
                    name="surname"
                    type="text"
                    v-model="surname"
                  ></v-text-field>
                </v-form>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="changesurnamebtn">
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

        <v-list-item>
          <v-list-item-icon> </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ this.userLoged.surname2 }}</v-list-item-title>
            <v-list-item-subtitle>Segundo apellido</v-list-item-subtitle>
          </v-list-item-content>
          <div class="text-center">
            <v-btn color="green darken-1" class="ma-2" dark @click="dialogs2 = true">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-dialog v-model="dialogs2" max-width="500px">
              <v-card>
                <v-form ref="form" lazy-validation>
                  <v-text-field
                    label="Segundo apellido"
                    name="surname2"
                    type="text"
                    v-model="surname2"
                  ></v-text-field>
                </v-form>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="changesurname2btn">
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

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="green darken-2">mdi-email</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ this.userLoged.email }}</v-list-item-title>
            <v-list-item-subtitle>Correo electrónico</v-list-item-subtitle>
          </v-list-item-content>
          <div class="text-center">
            <v-btn
              color="green darken-1"
              fab
              small
              dark
              v-on="on"
              @click="dialog3 = true"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-dialog v-model="dialog3" max-width="500px">
              <v-card>
                <v-form ref="form" lazy-validation>
                  <v-text-field
                    label="Correo electrónico"
                    name="email"
                    type="text"
                    v-model="email"
                  ></v-text-field>
                </v-form>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="changeemail">
                    Aceptar
                  </v-btn>
                  <v-btn color="green darken-1" dark @click="dialog3 = false"
                    >Cancelar</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="green darken-2">mdi-star-four-points</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ this.userLoged.level }}</v-list-item-title>
            <v-list-item-subtitle>Nivel</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="green darken-2">mdi-podium</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{
              this.userLoged.experience
            }}</v-list-item-title>
            <v-list-item-subtitle>Puntos de experiencia</v-list-item-subtitle>
            <v-progress-linear
              v-model="this.userLoged.experience"
              color="cyan darken-1"
            ></v-progress-linear>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-app>
</template>

<script>
const axios = require("axios");
import { mapState } from "vuex";
export default {
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
    notifications: false,
    sound: true,
    name: "",
    surname: "",
    surname2: "",
    email: "",
    on: "",
    widgets: false,
  }),

  mounted() {
    console.log(this.userLoged.name);
    if (this.userLoged === "null") {
      this.$router.push({ path: "/" });
    }
  },

  methods: {
    changenamebtn() {
      console.log("Se ha pulsado el botónes");
      console.log("nombre " + this.name);
      this.userLoged.name = this.name;
      axios
        .post(
          "http://192.168.0.30:3000/user/changeName?name="
            .concat(this.name)
            .concat("&userName=")
            .concat(this.userLoged.userName)
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

    changesurnamebtn() {
      console.log("Se ha pulsado el botónes");
      console.log("apellido " + this.surname);
      this.userLoged.surname = this.surname;
      axios
        .post(
          "http://192.168.0.30:3000/user/changeSurName?surname="
            .concat(this.surname)
            .concat("&userName=")
            .concat(this.userLoged.userName)
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

    changesurname2btn() {
      console.log("Se ha pulsado el botónes");
      console.log("apellido2 " + this.surname2);
      this.userLoged.surname2 = this.surname2;
      axios
        .post(
          "http://192.168.0.30:3000/user/changeSurName2?surname2="
            .concat(this.surname2)
            .concat("&userName=")
            .concat(this.userLoged.userName)
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

    changeemail() {
      console.log("Se ha pulsado el botónes");
      console.log("apellido2 " + this.surname2);
      this.userLoged.email = this.email;
      axios
        .post(
          "http://192.168.0.30:3000/user/changeEmail?email="
            .concat(this.email)
            .concat("&userName=")
            .concat(this.userLoged.userName)
        )
        .then((respose) => {
          console.log(respose);
        })
        .catch((error) => {
          console.log("ERROR");
          console.log(error);
        });
      this.dialog3 = false;
    },
  },
};
</script>
