 <template>
  <v-app id="inspire" >
 <v-app-bar app color="#6BCE6B" dark>
      <div class="d-flex align-center">
        <router-link to="/Login">
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

      <v-spacer></v-spacer>

     
    

      <!--<router-link to="/about"><v-btn class="ma-2" color="primary" dark> iniciar sesion
        
      </v-btn></router-link>-->

    </v-app-bar>
  
  
    
     <router-view/>
  
  
    </v-app>
    </template>
  <script>
  export default {
    data: () => ({
      loading: false,
      selection: 1,
    }),

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
  }
</script>
