<template>
  <v-container>
    <v-row>
      <v-col md="4">
        <v-card class="mx-auto" max-width="400" tile>
          <v-img
            height="100%"
            src="https://www.picawall.com/wp-content/uploads/2018/04/11242730.jpg"
          >
            <v-row align="end" class="fill-height">
              <v-col align-self="start" class="pa-0" cols="12">
                <v-avatar class="profile" color="grey" size="164" tile>
                  <v-img :src="you[0].img"></v-img>
                </v-avatar>
              </v-col>
              <v-col class="py-0">
                <v-list-item color="rgba(0, 0, 0, .4)" dark>
                  <v-list-item-content>
                    <v-list-item-title class="title">
                      {{ you[0].UserName }}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{
                      you[0].email
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-img>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="mx-auto">
          <v-app-bar class="d-flex justify-space-around">
            <v-toolbar-title>Chat</v-toolbar-title>
          </v-app-bar>
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <ul>
                  <v-card class="overflow-auto" max-height="500">
                    <v-card-text v-if="users.length == 0">
                      No messages
                    </v-card-text>
                    <v-card-text v-else>
                      <div v-for="user in users" :key="user.id">
                        <v-card>
                          <v-col md="2">
                            <div
                              class="pa-2 secondary text-no-wrap .rounded-lg text-center"
                            >
                              {{ user.name }}
                            </div>
                          </v-col>
                          <v-card-subtitle>
                            <v-row>
                              <v-spacer></v-spacer>
                              <v-col
                                class="pa-2 secondary text-no-wrap rounded-pill text-center"
                              >
                                <text-field
                                  class="pa-2 secondary text-no-wrap rounded-pill text-center"
                                >
                                  {{ user.message }}
                                </text-field>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-spacer></v-spacer>
                              <v-col md="2">
                                <div class="text-center">
                                  {{ user.timestamp }}
                                </div>
                              </v-col>
                            </v-row>
                          </v-card-subtitle>
                        </v-card>
                        <br />
                      </div>
                    </v-card-text>
                  </v-card>
                </ul>
                <!-- conponent -->
                <v-form @submit.prevent="createMessage">
                  <v-container>
                    <v-row>
                      <v-col md="12">
                        <v-text-field
                          placeholder="Send Something"
                          label="Message"
                          outlined
                          dense
                          v-model="newMessage"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
                <!-- conponent -->
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import firebase from 'firebase/app'
import { auth, db } from '~/plugins/FirebaseConfig.js'
import moment from 'moment'
export default {
  name: 'Message',
  props: ['name'],
  data: () => ({
    you: [{ UserName: '' }, { email: '' }, { img: '' }],
    filterText: '',
    benched: 0,
    users: [],
    curUser: [{ userId: '' }],
    curPeerUser: [{ userId: '' }],
    date: '',
    //////////////////
    currentUserId: [{ userId: '' }],
    currentPeerUser: '',
    groupChatId: null,
    newMessage: null,
    errorText: null,
    user: [{ email: '' }, { name: '' }, { UserName: '' }],
  }),
  methods: {
    getuser() {
      const data = auth.onAuthStateChanged((user) => {
        if (user) {
          const userId = firebase.auth().currentUser.uid
          db.collection('Users')
            .where('userId', '==', userId)
            .onSnapshot((querySnapshot) => {
              const data = []
              querySnapshot.forEach((doc) => {
                data.push(doc.data())
              })
              const userdata = data
              this.currentuserId = data
              this.curUser = data
              this.curPeerUser = this.$route.query.q
              let groupChatId = `${this.curUser[0].userId} + ${this.curPeerUser}`
              let ref = db
                .collection('Messages')
                .doc(groupChatId)
                .collection(groupChatId)
                .orderBy('timestamp')
              ref.onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                  if ((change.type = 'added')) {
                    let doc = change.doc
                    this.users.push({
                      id: doc.id,
                      name: doc.data().name,
                      message: doc.data().message,
                      timestamp: moment(doc.data().timestamp).format('LTS'),
                    })
                  }
                })
              })
              let groupChatId2 = `${this.curPeerUser} + ${this.curUser[0].userId}`
              let ref2 = db
                .collection('Messages')
                .doc(groupChatId2)
                .collection(groupChatId2)
                .orderBy('timestamp')
              ref2.onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                  if ((change.type = 'added')) {
                    let doc = change.doc
                    this.users.push({
                      id: doc.id,
                      name: doc.data().name,
                      message: doc.data().message,
                      timestamp: moment(doc.data().timestamp).format('LTS'),
                    })
                  }
                })
              })
            })
        }
      })
    },
    getyou() {
      db.collection('Users')
        .where('userId', '==', this.$route.query.q)
        .onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.you = data
        })
    },
    //////////////////////////////////////////
    getuser2() {
      const data = auth.onAuthStateChanged((user) => {
        if (user) {
          const userId = firebase.auth().currentUser.uid
          db.collection('Users')
            .where('userId', '==', userId)
            .onSnapshot((querySnapshot) => {
              const data = []
              querySnapshot.forEach((doc) => {
                data.push(doc.data())
              })
              const userdata = data
              this.currentuserId = data
              this.user = data
            })
        }
      })
    },
    createMessage() {
      const today = new Date()
      const date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate()
      const time =
        today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      const dateTime = date + ' ' + time
      this.date = dateTime
      this.currentPeerUser = this.$route.query.q
      let groupChatId = `${this.currentuserId[0].userId} + ${this.currentPeerUser}`
      if (this.newMessage) {
        db.collection('Messages')
          .doc(groupChatId)
          .collection(groupChatId)
          .doc(this.date)
          .set({
            idfrom: this.user[0].userId,
            idto: this.$route.query.q,
            message: this.newMessage,
            timestamp: Date.now(),
            name: this.user[0].UserName,
          })

          .catch((err) => {
            console.log(err)
          })
        this.newMessage = null
        this.errorText = null
      } else {
        this.errorText = 'A message must be entered first!'
      }
    },
    itsMe() {
      const data = auth.onAuthStateChanged((user) => {
        if (user.uid == this.$route.query.q) {
          this.$router.replace('/MyProfile')
        }
      })
    },
    checkuser() {
      var data = auth.onAuthStateChanged((user) => {
        if (!user) {
          this.$router.replace('/')
        }
      })
    },
  },
  created() {
    this.getyou()
    this.getuser()
    this.getuser2()
    this.itsMe()
    this.checkuser()
  },
}
</script>