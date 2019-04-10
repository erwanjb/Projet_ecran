import axios from 'axios'
import Vue from "vue";
import Vuex from "vuex"


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        events: [],
        eventsWeek: [],
        color: ["red", "orange", "blue", "green", "black", "yellow", "brown"],
        token: localStorage.getItem('access_token') || null,
        name:  localStorage.getItem('name') || null,
        email : localStorage.getItem('email') || null
      },
      mutations: {
        addEvents (state, e) {
          state.events.push(...e)
        },
        addEventsWeek (state, e) {
          state.eventsWeek.push(...e)
        },
        replaceEvents (state, e){
          state.events = e
        },
        replaceEventsWeek (state, e){
          state.eventsWeek = e
        },
        supEvent (state, e) {
          state.events.filter(event => event.debut === e.debut && event.fin === e.fin)
        },
        changeEventName(state, o) {
          const index = state.events.findIndex(e => e.sequence_id === o.id)
          state.events[index].sequence_name = o.name_sequence
        },
        changeEventColor(state, o) {
          const index = state.events.findIndex(e => e.sequence_id === o.id)
          state.events[index].sequence_color = o.color_sequence
        },
        authUser(state, appData) {
          state.token = appData.token
          state.name = appData.name
          state.email = appData.email
        },
        destroyToken(state, token){
          state.token = null
        }
      },
      actions: {
        importEvents(context) {
          axios({
            url: '/getEvents',
            method: 'GET'
          }).then(res => {
            context.commit('replaceEvents', res.data)
          })
        },
        importEventsWeek(context) {
          axios({
            url: '/getEventsWeek',
            method: 'GET'
          }).then(res => {
            context.commit('replaceEventsWeek', res.data)
          })
        },
        signup({ commit }, authData) {
          axios
            .post("/user/register", {
              last_name: authData.last_name,
              first_name: authData.first_name,
              email: authData.email,
              password: authData.password
            })
            .then(res => console.log(res))
            .catch(error => console.log(error));
        },
        login({ commit }, authData) {
    
          return new Promise((resolve, reject)=>{
    
            axios.post("/user/login", {
                email: authData.email,
                password: authData.password
              })
              .then(res => {
                console.log(res.data)
                let appData = {
                  token : res.data.token,
                  name : res.data.Name,
                  email : res.data.User
    
                }
                localStorage.setItem('access_token', appData.token )
                localStorage.setItem('name', appData.name )
                localStorage.setItem('email', appData.email )
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + appData.token
                commit("authUser", appData);
                resolve(res)
    
              })
              .catch(error => {
                console.log(error)
                reject(error)
              });
    
          })
    
        },
        destroyToken(context){
            console.log(context)
           // localStorage.removeItem('access_token')
            localStorage.clear();
            context.commit('destroyToken')
        }
      },
      getters: {
        loggedIn(state){
          return state.token !== null
        }
      }
    
})