import Vuex from 'vuex'
const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      currentuser: [{name:''},{Lname:''},{email:''},{bank:''},{IDcard:''},{phone:''},{username:''},{payment:''},{userId:''},{img:''},{admin:null},{date:''}],
      isLoggedIn: false,
      exUser:'',
      exItem:'',  
    }),
    getters: {
      currentuser: state => state.currentuser
    },
    mutations: {
      logingIn:(state,{userdata}) => {
        state.isLoggedIn = true
        state.currentuser.name = userdata[0].name
        state.currentuser.Lname = userdata[0].Lname
        state.currentuser.email = userdata[0].email
        state.currentuser.bank = userdata[0].Bank
        state.currentuser.IDcard = userdata[0].IDcard
        state.currentuser.phone = userdata[0].PhoneNumber
        state.currentuser.username = userdata[0].UserName
        state.currentuser.payment = userdata[0].payment
        state.currentuser.userId = userdata[0].userId
        state.currentuser.img = userdata[0].img
        state.currentuser.admin = userdata[0].admin
        state.currentuser.date = userdata[0].date
      },
      logingOut:(state) => {
        state.isLoggedIn = false
        state.currentuser = [{name:''},{Lname:''},{email:''},{bank:''},{IDcard:''},{phone:''},{username:''},{payment:''},{userId:''},{img:''},{admin:null},{date:''}]
      },
      findUser:(state,{exUserId}) =>{
        state.exUser = exUserId
      },
      findItem:(state,{exItemId}) => {
        state.exItem = exItemId
      }

    },
    actions: {
      async setUser({ commit }, userdata) {
        commit("logingIn", { userdata });
      },
      async logout({ commit }) {
        commit("logingOut");
      },
      async setExUser({ commit},exUserId){
        commit("findUser",{exUserId});
      },
      async setEXItem({commit},exItemId){
        commit("findItem",{exItemId});
      }
    },
  })
}
export default createStore
