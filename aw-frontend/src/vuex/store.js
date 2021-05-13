import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default  new Vuex.Store({

    state:{

        userLoged : 'null'
    },
    mutations:{

        setUserLogued(state,user){
            console.log("Estoy en vueX y este es el nuevo usuario: " + user)
            state.userLoged =user
      
        }
    },
    actions: {

    },
    getters:{

        getLogedUser : state => {
            return state.userLoged
        }
    }
})


