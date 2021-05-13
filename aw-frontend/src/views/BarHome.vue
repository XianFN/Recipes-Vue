 <template>
  <v-app id="inspire">
    <v-app-bar app color="green darken-1" dark>
      <div class="d-flex align-center">
        <router-link to="/Home">
          <v-img
            alt="Logo"
            class="shrink mr-2"
            contain
            src="../assets/iconinicio.png"
            transition="scale-transition"
            width="50"
          />
        </router-link>
        <h1 class="font-weight-thin py-3">TodoCocina.com</h1>
      </div>
      <v-layout d-felx align-center justify-center>
        <v-text-field
        align-center justify-center
          v-model="model"
          label="Busqueda"
          outlined
          hide-details
          rounded
          dense
          filled
         
        
          append-icon="mdi-magnify"
          @click:append="$router.push({ name: 'SearchByCategory', params: {searchData: model} })"
        ></v-text-field>
      </v-layout>

      <v-layout align-end justify-end>
        <div class="text-center">
          <v-menu>
            <template v-slot:activator="{ on: menu }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on: tooltip }">
                  <v-btn color="secundary" dark v-on="{ ...tooltip, ...menu }">Menu</v-btn>
                </template>
                <span>Mostrar el menu</span>
              </v-tooltip>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index" @click="redirect(index)">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-layout>
    </v-app-bar>

    <router-view />
  </v-app>
</template>
<style scoped>
.v-text-field {
  width: 100px;
}
.v-text-field.v-input--dense {
  padding-top: 0;
  max-width: 400px;
}
</style>
    <script>
// @click="$router.push({ name: 'SearchByCategory', params: {searchData: categoryName} })"
export default {
  data: () => ({
    model: "",
    items: [
      { title: "Perfil", route: "/Home" },
      { title: "Crear receta" },
      { title: "Mis recetas" },
      { title: "Ayuda" },
      { title: "Administracion" },
      { title: "Cerrar Sesion" }
    ]
  }),
  methods: {
    redirect: function(index) {
      console.log("Clicado, con el valor " + index);

      switch (index) {
        case 0:
          console.log("Clicado, con el valor 0");
          this.$router.push({ path: "/Profile" });
          break;
        case 1:
          console.log("Clicado, con el valor 1");
          this.$router.push({ path: "/create" });
          break;
        case 2:
          console.log("Clicado, con el valor 2");
          this.$router.push({ path: "/MisRecetas" });
          break;

        case 3:
          console.log("Clicado, con el valor 3");
          this.$router.push({ path: "/Help" });
          break;
        case 4:
          console.log("Clicado, con el valor 4");
          this.$router.push({ path: "/Admin" });
          break;
        case 5:
          console.log("Cerrada la sesion");
          localStorage.userid="null"
          this.$router.push({ path: "/" });
          break;
      }
    }
  }
};
</script>