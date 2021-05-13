<template>
  <v-card>
    <v-toolbar
      color="green"
      dark
      flat
    >

      <v-spacer></v-spacer>

      <v-toolbar-title class="font-weight-thin">Ayuda</v-toolbar-title>

      <v-spacer></v-spacer>

      <template v-slot:extension>
        <v-tabs
          v-model="model"
          centered
          slider-color="white"
        >
          <v-tab
            :key="1"
            :href="`#tab-1`"
          >
            Inicio
          </v-tab>
          <v-tab
            :key="2"
            :href="`#tab-2`"
          >
            Registro
          </v-tab>
          <v-tab
            :key="3"
            :href="`#tab-3`"
          >
            Login
          </v-tab>
          <v-tab
            :key="3"
            :href="`#tab-4`"
          >
            Crear receta
          </v-tab>
          <v-tab
            :key="3"
            :href="`#tab-5`"
          >
            Administración
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="model">
      <v-tab-item
        :key="1"
        :value="`tab-1`"
      >
        <v-card flat>
          <v-card-text v-text="text"></v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item
        :key="2"
        :value="`tab-2`"
      >
        <v-card flat>
          <v-card-text v-text="text2"></v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item
        :key="3"
        :value="`tab-3`"
      >
        <v-card flat>
          <v-card-text v-text="text3"></v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item
        :key="4"
        :value="`tab-4`"
      >
        <v-card flat>
          <v-card-text v-text="text4"></v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item
        :key="5"
        :value="`tab-5`"
      >
        <v-card flat>
          <v-card-text v-text="text5"></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    data () {
      return {
        model: 'tab-2',
        text: 'TodoCocina.com, es una red privada para cocineros expertos, que quieren tener guardadas todas sus recetas en un sólo lugar. Así podrás acceder a ellas, de forma sencilla, desde cualquier dispositivo. Además los cocineros pueden compartir sus recetas, para que otros usuarios puedan disfruter de ellas.',
        text2: 'Registrarse en TodoCocina.com es muy fácil, si no tienes una cuenta, al entrar en el login, simplemente haz click en "Registrarse" y allí encontrarás un sencillo formulario. Rellénalo y pasarás a formar parte de nuestra comunidad.',
        text3: 'TodoCocina.como es una web para usuarios registrados, por lo que es necesario que inicies sesión para acceder a todo su contenido. Simplemente introduce tu nombre de usuario y contraseña y podrás acceder a la web.',
        text4: 'Para crear una nueva receta, entra en el "crear receta", en el menú de tu izquierda. Ahí podrás añadir los pasos para hacer tu receta, además de los ingredientes que podrás seleccionar de una lista. Esto te permitirá conocer las calorías totales de tu plato.',
        text5: 'En la pestaña de administración, en el menú de la derecha, es posible editar y eliminar los ingredientes generados por los usuarios. Además de crear nuevas categorías para los platos.',
      
      }
    },
      computed:{

    ...mapState(['userLoged'])
  },
    mounted () {
    if (this.userLoged==='null') {
      this.$router.push({ path: '/' });
    }
    }
 
  }
</script>