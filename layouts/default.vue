<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      temporary
    >
      <v-list-item>
        <div v-if="user == true">
          <v-list v-if="this.$store.state.isLoggedIn == true">
            <v-list v-if="this.$store.state.currentuser.admin == true">
              <v-list-item link>
                <v-list-item-content>
                  <v-row justify="center">
                    <v-avatar size="70">
                      <img :src="this.$store.state.currentuser.img" />
                    </v-avatar>
                  </v-row>
                  <v-list-item-title class="title">
                    <v-body>
                      {{ this.$store.state.currentuser.username }}
                    </v-body>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ this.$store.state.currentuser.email }}
                  </v-list-item-subtitle>
                  <v-list nav dense>
                    <v-list-item link nuxt to="/MyProfile">
                      <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>My Profile</v-list-item-title>
                    </v-list-item>
                    <v-list-item link nuxt to="/searchUser">
                      <v-list-item-icon>
                        <v-icon>mdi-chat-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>chat</v-list-item-title>
                    </v-list-item>
                    <v-list-item link nuxt to="/admin">
                      <v-list-item-icon>
                        <v-icon>mdi-database-edit</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>data table</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="logout">
                      <v-list-item-icon>
                        <v-icon>mdi-logout</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-list v-else>
              <v-list-item link>
                <v-list-item-content>
                  <v-row justify="center">
                    <v-avatar size="70">
                      <img :src="this.$store.state.currentuser.img" />
                    </v-avatar>
                  </v-row>
                  <v-row justify="center" align="center">
                    <v-list-item-title class="title">
                      <v-body>
                        {{ this.$store.state.currentuser.username }}
                      </v-body>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ this.$store.state.currentuser.email }}
                    </v-list-item-subtitle>
                  </v-row>

                  <v-list nav dense>
                    <v-list-item link nuxt to="/MyProfile">
                      <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>My Profile</v-list-item-title>
                    </v-list-item>
                    <v-list-item link nuxt to="/searchUser">
                      <v-list-item-icon>
                        <v-icon>mdi-chat-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>chat</v-list-item-title>
                    </v-list-item>
                    <v-list-item link nuxt to="/PlaceOrder">
                      <v-list-item-icon>
                        <v-icon>mdi-plus-box</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>PlaceOrder</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="logout">
                      <v-list-item-icon>
                        <v-icon>mdi-logout</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-list>
          <v-list v-else>
            <v-list nav dense>
              <v-list-item link nuxt to="/login">
                <v-list-item-icon>
                  <v-icon>mdi-login</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Login</v-list-item-title>
              </v-list-item>
              <v-list-item link nuxt to="/Register">
                <v-list-item-icon>
                  <v-icon>mdi-account-plus</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Register</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-list>
        </div>
        <v-div v-else-if="user == false">
          <v-list nav dense>
            <v-list-item @click="kickoff">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-div>
      </v-list-item>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app class="hidden-md-and-up">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn text><v-toolbar-title v-text="title" @click="main" /></v-btn>
      <v-spacer />
    </v-app-bar>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      class="hidden-sm-and-down"
      color="grey lighten-1"
    >
      <v-btn text><v-toolbar-title v-text="title" @click="main" /></v-btn>
      <v-spacer />
      <v-div v-if="user == true">
        <div
          v-if="this.$store.state.isLoggedIn == true"
          class="d-flex justify-center align-center"
        >
          <div
            v-if="this.$store.state.currentuser.admin == true"
            class="d-flex justify-center align-center"
          >
            <v-col>
              <v-btn class="text-uppercase" text @click="admin"
                ><v-icon>mdi-database-edit</v-icon> data table</v-btn
              >
            </v-col>
            <v-col>
              <div class="text-center">
                <v-menu open-on-hover offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs" v-on="on">
                      <v-avatar size="43">
                        <img :src="$store.state.currentuser.img" />
                      </v-avatar>
                      <v-subtitle>
                        {{ $store.state.currentuser.username }}
                      </v-subtitle>
                    </div>
                  </template>
                  <v-list nav dense>
                    <v-list-item link nuxt to="/MyProfile">
                      <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>My Profile</v-list-item-title>
                    </v-list-item>
                    <v-list-item link nuxt to="/searchUser">
                      <v-list-item-icon>
                        <v-icon>mdi-chat-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>chat</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="logout">
                      <v-list-item-icon>
                        <v-icon>mdi-logout</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-col>
          </div>
          <div v-else class="d-flex justify-center align-center">
            <v-col>
              <v-btn class="text-uppercase" text @click="order"
                ><v-icon>mdi-plus-box</v-icon>place order</v-btn
              >
            </v-col>
            <v-col>
              <div class="text-center">
                <v-menu open-on-hover offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs" v-on="on">
                      <v-avatar size="43">
                        <img :src="$store.state.currentuser.img" />
                      </v-avatar>
                      <v-subtitle>{{
                        $store.state.currentuser.username
                      }}</v-subtitle>
                    </div>
                  </template>
                  <v-list nav dense>
                    <v-list-item link nuxt to="/MyProfile">
                      <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>My Profile</v-list-item-title>
                    </v-list-item>
                    <v-list-item link nuxt to="/searchUser">
                      <v-list-item-icon>
                        <v-icon>mdi-chat-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>chat</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="logout">
                      <v-list-item-icon>
                        <v-icon>mdi-logout</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-col>
          </div>
        </div>
        <div v-else>
          <v-btn nuxt to="/login"><v-icon>mdi-login</v-icon>login</v-btn>
          <v-btn nuxt to="/Register">
            <v-icon>mdi-account-plus</v-icon>Register
          </v-btn>
        </div>
      </v-div>
      <div v-else>
        <v-btn @click="kickoff"><v-icon>mdi-logout</v-icon>logout</v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <div v-if="user == true">
          <nuxt />
        </div>
        <div v-else>
          <img
            src="https://i.imgur.com/9928Dmo.png"
            height="100%"
            width="100%"
          />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { db } from '~/plugins/FirebaseConfig.js'
import firebase from 'firebase/app'
import { auth } from '~/plugins/FirebaseConfig.js'
export default {
  data: function () {
    return {
      user: true,
      miniVariant: false,
      clipped: false,
      drawer: false,
      title: 'overflow',
    }
  },
  methods: {
    checkuser() {
      var data = auth.onAuthStateChanged((user) => {
        if (user) {
          var userId = firebase.auth().currentUser.uid
          db.collection('Users')
            .where('userId', '==', userId)
            .onSnapshot((querySnapshot) => {
              const data = []
              querySnapshot.forEach((doc) => {
                data.push(doc.data())
              })
              let userdata = data
              if (data.length == 0) {
                this.user = false
              } else {
                this.user = true
              }
              console.log(this.user)
              this.$store.dispatch('setUser', userdata)
            })
        }
      })
    },
    logout() {
      this.$store.dispatch('logout')
      auth.signOut()
    },
    kickoff() {
      this.$store.dispatch('logout')
      auth.signOut()
      location.reload()
    },
    order() {
      this.$router.replace('/PlaceOrder')
    },
    main() {
      this.$router.replace('/')
    },
    admin() {
      this.$router.replace('/admin')
    },
  },
  created() {
    this.checkuser()
  },
}
</script>