<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      :rules="passRules"
      label="Password"
      required
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="show = !show"
      :type="show ? 'text' : 'password'"
    ></v-text-field>
    <v-btn :disabled="!valid" class="mr-4" @click="loginfuc">
      <v-icon>mdi-login</v-icon>Login
    </v-btn>
    <v-btn class="mr-4" nuxt to="/Register">
      <v-icon>mdi-account-plus</v-icon> Register
    </v-btn>
    <v-dialog v-model="dialogerror" max-width="400">
      <v-card>
        <v-card-title class="headline"> Something wrong </v-card-title>
        <v-card-text> {{ error }} </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialogerror = false">
            Try again!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>
<script>
import { store } from '~/store/index'
import { db } from '~/plugins/FirebaseConfig.js'
import firebase from 'firebase/app'
import { auth } from '~/plugins/FirebaseConfig.js'
export default {
  data: () => ({
    error: '',
    user: null,
    dialogerror: false,
    show: false,
    valid: true,
    email: '',
    emailRules: [(v) => !!v || 'E-mail is required'],
    password: '',
    passRules: [(v) => !!v || 'Password is required'],
  }),

  methods: {
    loginfuc() {
      this.login()
    },
    login() {
      this.$refs.form.validate()
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log('login!!')
          var userId = firebase.auth().currentUser.uid
          db.collection('Users')
            .doc(userId)
            .onSnapshot((querySnapshot) => {
              const data = []
              querySnapshot.forEach((doc) => {
                data.push(doc.data())
              })
              let userdata = data
              console.log(userdata)
              this.$store.dispatch('setUser', userdata)
            })
          this.dialogsucess = true
          this.$router.replace('/')
        })
        .catch((error) => {
          var errorMessage = error.message
          this.error = errorMessage
          this.dialogerror = true
        })
    },
  },
  created() {},
}
</script>
<style>
</style>