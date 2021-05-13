<template>
  <v-app id="inspire">
    
 
      <v-card
    color="blue-grey darken-1"

  >
  


    <v-img
      height="200"
      v-bind:src="image"
    >
      
        
        <v-row
          class="pa-4"
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <h5 class="headline" style="color:white">{{ name }}</h5>
           
          </v-col>
        </v-row>
     
    </v-img>



    <v-form>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            
          >
            <v-text-field
              dark
              v-model="name"
              :disabled="isUpdating"
              filled
              color="blue-grey lighten-2"
              label="Nombre de la receta"
            ></v-text-field>
          </v-col>

          <v-col cols="12"
          md="6">
            <v-autocomplete
              dark
              v-model="selectedCategorias"
              :disabled="isUpdating"
              :items="categorias"
              filled
              chips
              color="blue-grey lighten-2"
              label="Seleccionar Categorias"
              item-text="name"
              item-value="name"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="removeC(data.item)"
                >
                  {{ data.item.name }}
                </v-chip>
              </template>

              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>

            </v-autocomplete>
          </v-col>



          <v-col cols="12"
          md="6">
            <v-autocomplete
              dark
              v-model="selectedIngredientes"
              :disabled="isUpdating"
              :items="ingredientes"
              filled
              chips
              color="blue-grey lighten-2"
              label="Seleccionar ingredientes"
              item-text="name"
              item-value= "name"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  {{ data.item.name  }}
                </v-chip>
              </template>

              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  
                  <v-list-item-content>
                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="data.item.calories + ' kcal'"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>

            </v-autocomplete>
          </v-col>


 


 <v-row justify="center">
   
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">¿No encuentras algún ingrediente?</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Crear nuevo ingrediente</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              
              <v-col cols="12">
                <v-text-field v-model="nombreIngrediente" label="Nombre del ingrediente" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="kcalIngrediente" label="Kcal (100g)" required></v-text-field>
              </v-col>

              <p v-if="bol2" style="margin-top:20px;" >
    <b >Por favor, corrija el(los) siguiente(s) error(es):</b>
    <ul>
      <li  v-for="(error,i) in errors" :key="i">{{ error }}</li>
    </ul>
  </p>
              
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark @click="dialog = false">Cancelar</v-btn>
          <v-btn dark @click="crearIngrediente()">Crear</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
<v-col cols="12">
    <v-alert
      :value="alert"
      dismissible
      type="success"
      transition="scale-transition"
    >
      Ingrediente creado con éxito.
    </v-alert>
</v-col >
  </v-row>




 


          <v-col cols="12">
              <v-file-input
                dark
                v-model="file"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Subir imagen"
                prepend-icon="mdi-camera"
                label="Imagen de la receta"
                @change="onFileInput()"
              ></v-file-input>
          </v-col>

         <v-col
            cols="12"
            md="6"
            
          >
            <v-text-field
              dark
              v-model="personas"
              :disabled="isUpdating"
              filled
              color="blue-grey lighten-2"
              label="Personas necesarias"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
            
          >
            <v-text-field
              dark
              v-model="time"
              :disabled="isUpdating"
              filled
              color="blue-grey lighten-2"
              label="Tiempo estimado requerido"
            ></v-text-field>
          </v-col>


        </v-row>

<v-divider></v-divider>

<v-form>

 <h3 class="headline" style="color:white">Pasos de la receta</h3>
<v-col
            cols="12"
            
          >
            <v-text-field
              dark
              v-model="pasoNombre"
              :disabled="isUpdating"
              filled
              color="blue-grey lighten-2"
              label="Nombre del paso"
            ></v-text-field>
          </v-col>


<v-col cols="12">
          <v-textarea class="red--text"
          v-model="pasoDescripcion"
          clearable="clearable"
          outlined="outlined"
          single-line="singleLine"
          rounded="rounded"
          background-color="amber lighten-4"
          color="orange orange-darken-4"
          text-color="black"
          placeholder="Descripción del paso"
    ></v-textarea>
</v-col>

<v-btn
        dark
        :loading="isUpdating"
        color="blue-grey darken-3"
        depressed
        @click="nuevoPaso()"
      >
        <v-icon left>mdi-plus</v-icon>
        Añadir Paso
      </v-btn>

</v-form>

<p v-if="bol" style="margin-top:20px;" >
    <b style="color: #FFFFFF;">Por favor, corrija el(los) siguiente(s) error(es):</b>
    <ul>
      <li  style="color: #FFFFFF;" v-for="(error,i) in errors" :key="i">{{ error }}</li>
    </ul>
  </p>

 <v-card
    class="mx-auto"
    max-width="500"
    tile
  >
    <v-list
    dark
    color="blue-grey darken-1">
      
      <v-list-item-group v-model="paso" color="primary">
        <v-list-item
          v-for="(paso, i) in listaPasos"
          :key="i"
        >
          <v-list-item-content>
              <v-list-item-title v-text="paso.nP"></v-list-item-title>
              <v-list-item-subtitle v-text="paso.dP"></v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>


      </v-container>

    </v-form>

<v-col cols="12">
    <v-alert
      :value="alert2"
      dismissible
      type="success"
      transition="scale-transition"
    >
      Receta creada con éxito.
    </v-alert>
</v-col >
    <v-divider></v-divider>

   


    <v-card-actions>
      
      <v-spacer></v-spacer>

<v-row >
    <v-dialog v-model="dialog2" persistent max-width="600px">
      <template v-slot:activator="{ on }">
       <v-btn
        dark
        v-on="on"
        :loading="isUpdating"
        color="blue-grey darken-3"
        depressed
      
      >
        <v-icon left>mdi-update</v-icon>
        Crear Receta
      </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Especifique la cantidad de cada ingrediente</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-simple-table >
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Nombre</th>
          <th class="text-left">Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in selectedIngredientes" :key="item">
          <td>{{ item}}</td>
          <td> <v-text-field
              v-model="calories[item]"
              color="blue-grey lighten-2"
              label="en gramos"
            ></v-text-field></td>

        </tr>
      </tbody>
    </template>
  </v-simple-table>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark @click="crearReceta()">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
          
    </v-dialog>
  </v-row>

    </v-card-actions>


  </v-card>
  
  </v-app>
</template>

<script>
  const axios = require('axios')
  var x = '';
  import {mapState} from 'vuex'
  export default {
    computed:{

    ...mapState(['userLoged'])
    
  },
    data () {

      return {
        autoUpdate: true,
        selectedIngredientes: [],
        file: '',
        image:'',
        im:'',
        pasoNombre:'',
        listaPasos: [],
        paso: 1,
        ing: 1,
        listaPasoNombre: [],
        pasoDescripcion:'',
        listaPasoDescripcion: [],
        selectedCategorias: [],
        isUpdating: false,
        name: '',
        personas:'',
        time:'',
        categorias: [
          
        ],
        ingredientes: [
          
        ],
        calories:{

        },
        errors: [],
        bol: false,
        bol2: false,
        nombreIngrediente:'',
        kcalIngrediente:'',
        dialog: false,
        dialog2: false,
        alert: false,
        alert2:false,
      }
    },

    watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      },
    },

    methods: {
      remove (item) { 
        const index = this.selectedIngredientes.indexOf(item.name)
        if (index >= 0) this.selectedIngredientes.splice(index, 1)
      },
      removeC (item) {
        const index = this.selectedCategorias.indexOf(item.name)
        if (index >= 0) this.selectedCategorias.splice(index, 1)
      },

      onFileInput() { 	   
      const data = URL.createObjectURL(this.file);
      this.image = data;
      
      this.getBase64Image(data, function(base64image){
        x=base64image;
        
        //console.log(b64Image);
    
});
setTimeout(() => { this.dataURItoBlob("data:Buffer;base64,"+ x); }, 5000);

    },


dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            console.log(ia);
            var c = new Buffer( ia ).toString('base64');
            console.log(mimeString);
            console.log(c);
            this.im=ia;
            console.log(this.im);
        },





    nuevoPaso() { 
      this.errors = [];
      this.bol =false;
      if (this.pasoNombre=='' || this.pasoDescripcion==''  ) {
        this.errors.push("El nombre del paso es obligatorio y la descripción es obligatoria.");
        this.bol=true;
      }

      if(!this.bol){
        var aux = {nP: this.pasoNombre, dP: this.pasoDescripcion}
        this.listaPasos.push(aux);
    

     this.listaPasoNombre.push(this.pasoNombre, );
     this.listaPasoDescripcion.push(this.pasoDescripcion);
     this.pasoNombre='';
     this.pasoDescripcion="";
      }
    
    },
    crearIngrediente() {

        this.errors = [];
      this.bol2 =false;
      if (this.nombreIngrediente=='' || this.kcalIngrediente==''  ) {
        this.errors.push("El nombre del ingrediente es obligatorio y las kcal son obligatorias.");
        this.bol2=true;
      }

      if(!this.bol2){

          var aux = { name: this.nombreIngrediente, calories: this.kcalIngrediente};
        this.ingredientes.push(aux);
        this.dialog=false;

        axios
                      .post('http://192.168.0.30:3000/ingredient/create', {
                        
                              name: aux.name,
                              calories: aux.calories
                         
                      })
                      .then(response =>{
                
                console.log(response);
            })
             .catch(error => {
        // handle error
        console.log(error);
      });      

          this.alerta();
      }



        
    },
    crearReceta() {
        var aux = 0;
        for(var i=0; i<this.selectedIngredientes.length; i++){
         for(var j=0; j<this.ingredientes.length; j++){
           if(this.selectedIngredientes[i] == this.ingredientes[j].name){
              aux=aux+this.ingredientes[j].calories;
           }
         }
          
        }
        
       
       var blob = new Blob([this.im], {type: "octet/stream"});
       console.log(blob);
       
        axios
                      .post('http://192.168.0.30:3000/recipe/create', {

                              name: this.name,
                              image: blob,
                              countcalories: aux,
                              people: this.personas,
                              time: this.time
                         
                      })
                      .then(response =>{
                
                console.log(response);
                console.log(this.im);
            })
             .catch(error => {
        // handle error
        console.log(error);
      });     
      this.crearPasos(); 
    },

    crearPasos() {


      var aux = []
       axios
             .get("http://192.168.0.30:3000/recipe/getAllrecipes", {})
            .then(response =>{
              console.log(response.data);
                aux=response.data;
                  for(var i=0; i<this.listaPasos.length; i++){
          console.log(this.listaPasos[i])
          axios
                      .post('http://192.168.0.30:3000/step/create', {
                        
                              title: this.listaPasos[i].nP,
                              description: this.listaPasos[i].dP,
                              ordernum: i+1,
                              recipeId: aux[aux.length-1].id
                         
                      })
                      .then(response =>{
                
                console.log(response);
            })
             .catch(error => {
        // handle error
        console.log(error);
      });      
        }
            })
             .catch(error => {
        // handle error
        console.log(error);
      });      
      
        this.crearCategoryRecipe();
    },

    crearCategoryRecipe() {     

      var aux = []
       axios
             .get("http://192.168.0.30:3000/recipe/getAllrecipes", {})
            .then(response =>{
                console.log(response.data);
                aux=response.data;
                
        for(var i=0; i<this.selectedCategorias.length; i++){
          var id;
          
          for(var j=0; j<this.categorias.length; j++){
             if(this.selectedCategorias[i] == this.categorias[j].name){
              id=this.categorias[j].id;
           }
          }
          axios
                      .post('http://192.168.0.30:3000/category_recipe/create', {
                        
                              recipeId: aux[aux.length-1].id,
                              categoryId: id,
                         
                      })
                      .then(response =>{
                
                console.log(response);
            })
             .catch(error => {
        // handle error
        console.log(error);
      });      
        }
            })
             .catch(error => {
        // handle error
        console.log(error);
      });      
      
        this.crearUserRecipe();
        
    },

    crearUserRecipe() {     

      var aux = []
       axios
             .get("http://192.168.0.30:3000/recipe/getAllrecipes", {})
            .then(response =>{
                console.log(response.data);
                aux=response.data;

          axios
                      .post('http://192.168.0.30:3000/user_recipe/create', {
                        
                              created: 1,
                              recipeId: aux[aux.length-1].id,
                              userId: this.userLoged.id,
                         
                      })
                      .then(response =>{
                
                console.log(response);
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
      
        this.crearRecipeIngredients();
        
    },

    crearRecipeIngredients() {     
      var aux = []
       axios
             .get("http://192.168.0.30:3000/recipe/getAllrecipes", {})
            .then(response =>{
                console.log(response.data);
                aux=response.data;
                
        for(var i=0; i<this.selectedIngredientes.length; i++){
          var id;
          for(var j=0; j<this.ingredientes.length; j++){
             if(this.selectedIngredientes[i] == this.ingredientes[j].name){
              id=this.ingredientes[j].id;
              var c=this.selectedIngredientes[i];
           }
          }
          axios
                      .post('http://192.168.0.30:3000/recipe_ingredients/create', {


                              ammount: this.calories[c],
                              recipeId: aux[aux.length-1].id,
                              ingredientId: id,
                         
                      })
                      .then(response =>{
                
                console.log(response);
            })
             .catch(error => {
        // handle error
        console.log(error);
      });      
        }
            })
             .catch(error => {
        // handle error
        console.log(error);
      });      
      
        this.dialog2=false;
        this.alerta2();
    },

     alerta(){
          this.alert=true;
          setTimeout(() => { this.alert=false; }, 2000);
         
     },

     alerta2(){
          this.alert2=true;
          setTimeout(() => { this.alert2=false; }, 2000);
         
     },


getBase64Image(imgUrl, callback) {

    var img = new Image();
    var p ='';

    // onload fires when the image is fully loadded, and has width and height

    img.onload = function(){

      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dL = canvas.toDataURL("image/png");
          dL = dL.replace(/^data:image\/(png|jpg);base64,/, "");
     // console.log(dL);
      p=dL;
      callback(dL); // the base64 string

    };

    // set attributes and src 
    img.setAttribute('crossOrigin', 'anonymous'); //
    img.src = imgUrl;
    console.log(p);
    return p;

},


    
    
      inicializarIngredientes () {
                   
            axios
             .get("http://192.168.0.30:3000/ingredient/GetAllIngredient", {
                
            })
            .then(response =>{
                
                this.ingredientes=response.data;
            })
             .catch(error => {
        // handle error
        console.log(error);
      });      
             
        },

         inicializarCategorias () {
                   
            axios
             .get("http://192.168.0.30:3000/category/GetAllCategories", {
                
            })
            .then(response =>{
                
                this.categorias=response.data;
            })
             .catch(error => {
        // handle error
        console.log(error);
      });      
             
        },
    },
    mounted(){
      
    if (this.userLoged==='null') {
      this.$router.push({ path: '/' });
    }
    this.inicializarIngredientes();
    this.inicializarCategorias();
  }
  }
</script>