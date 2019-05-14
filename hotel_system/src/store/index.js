import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    user: {}
  },
  mutations: {
    login(state){
      state.isLogin = true;
    },
    logout(state){
      state.isLogin = false;
      state.user = {};
    },
    initUser(state, user){
      for(let key in user){
        if(user.hasOwnProperty(key)) {
          state.user[key] = user[key];        
        }
      }
    },
    clearUser(state){
      state.user = {};
    }
  },
  getters: {
    currentUser: function (state) {
        return state.user
    }
  },
  actions: {
    login({commit}){
      commit('login');
    },
    logout({commit}){
      commit('logout');
    },
    initUser({commit}, user){
      commit('initUser', user);
    },
    clearUser({commit}){
      commit('clearUser');
    }
  }
});

export default store;