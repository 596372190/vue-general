import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

 const store = new Vuex.Store({
  state: {
    collapse:false,
  },
  mutations: {
    CHANGE_DATA:(state,{key,value})=>{
      if(state.hasOwnProperty(key)){
        state[key]=value;
      }
    },
  },
  actions: {

  },
  modules: {}
});
export default store;
