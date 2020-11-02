<template>
  <v-card class="mx-auto">
    <v-app-bar class="d-flex justify-space-around">
      <v-toolbar-title>Chat</v-toolbar-title>
    </v-app-bar>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <ul>
            <v-card class="overflow-auto" max-height="500">
              <v-card-text v-if="users.length == 0"> No messages </v-card-text>
              <v-card-text v-else>
                <div v-for="user in filteredMessage" :key="user.id">
                  <v-card>
                    <v-col md="2">
                      <div
                        class="pa-2 secondary text-no-wrap .rounded-lg text-center"
                      >
                        {{ user.name }}
                      </div>
                    </v-col>
                    <v-card-subtitle>
                      <v-col>
                        <v-textarea
                          readonly
                          outlined
                          :value="user.message"
                        ></v-textarea>
                      </v-col>
                      <v-row>
                        <v-spacer></v-spacer>
                        <v-col md="2">
                          <div
                            class="pa-2 secondary text-no-wrap rounded-pill text-center"
                          >
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
              <v-row justify="center">
                <v-col md="11">
                  <v-text-field
                    placeholder="Send Something"
                    label="Message"
                    outlined
                    dense
                    v-model="newMessage"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-btn class="mx-2" fab dark small type="submit">
                    <v-icon> mdi-send </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <!-- conponent -->
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import firebase from 'firebase/app'
import { auth, db } from '~/plugins/FirebaseConfig.js'
import moment from 'moment'
export default {
  name: 'Message',
  props: ['name'],
  data: () => ({
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
      this.sortLowest()
    },
    getMessage() {
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
              timestamp: moment(doc.data().timestamp).format('UTC'),
            })
          }
        })
      })
      ////////
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
              timestamp: moment(doc.data().timestamp).format('UTC'),
            })
          }
        })
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
    sortLowest() {
      this.users.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
      console.log(this.users)
    },
  },
  created() {
    this.getuser()
    this.getuser2()
  },
  computed: {
    filteredMessage() {
      let filter = new RegExp(this.filterText, 'i')
      return this.users.filter((el) => el.name.match(filter))
    },
  },
}
</script>