<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="6">
        <v-text-field
          v-model="search"
          label="search"
          filled
          rounded
          dense
          hint="search from username"
        ></v-text-field>
      </v-col>
    </v-row>
    <div>
      <v-row>
        <v-col>
          <div v-if="filterUsers() == ''">
            <v-row justify="center" align="start">
              <v-col md="6">
                <v-img
                  src="https://i.imgur.com/BmmcfOe.png"
                  height="90%"
                  width="90%"
                ></v-img>
              </v-col>
            </v-row>
          </div>
          <div v-else>
            <v-row>
              <v-col v-for="users in filterUsers()" :key="users.userId">
                <v-card
                  class="mx-auto grey lighten-3 outlined"
                  width="500"
                  outlined
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-4">
                        {{ users.name }} {{ users.Lname }}
                      </div>
                      <v-list-item-title class="headline mb-1">
                        {{ users.UserName }}
                      </v-list-item-title>
                      <v-list-item-subtitle>{{
                        users.email
                      }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-avatar tile size="80" color="grey">
                      <img :src="users.img" />
                    </v-list-item-avatar>
                  </v-list-item>

                  <v-card-actions>
                    <v-btn
                      outlined
                      rounded
                      text
                      :to="{
                        name: 'chat',
                        query: { q: users.userId },
                      }"
                    >
                      Chat
                    </v-btn>
                    <v-btn
                      outlined
                      rounded
                      text
                      :to="{
                        name: 'Profile-ProId',
                        params: { ProId: users.userId },
                      }"
                    >
                      Profile
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>

              <br />
            </v-row>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import { db } from '~/plugins/FirebaseConfig.js'
export default {
  data: function () {
    return {
      search: '',
      users: [],
    }
  },
  methods: {
    getAllUsers() {
      db.collection('Users').onSnapshot((querySnapshot) => {
        var data = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
        })
        this.users = data
      })
    },
    filterUsers() {
      return this.users.filter((card) => {
        return card.UserName.match(this.search)
      })
    },
  },
  created() {
    this.getAllUsers()
  },
  computed() {
    this.filterSellCard()
  },
}
</script>

<style>
</style>