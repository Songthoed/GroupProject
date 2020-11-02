<template>
  <v-container>
    <v-row>
      <v-col md="6">
        <v-carousel height="400">
          <v-carousel-item
            v-for="(img, i) in exItem[0].img"
            :key="i"
            :src="img"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
      <v-col md="6">
        <v-card class="mx-auto" tile>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title
                ><h2>{{ exItem[0].name }}</h2>
              </v-list-item-title>
              <v-list-item-subtitle>
                <h4>{{ exItem[0].status }}</h4>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                ><h3>
                  Price : ฿{{ exItem[0].price }}
                  <v-icon small> mdi-cash</v-icon>
                </h3>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                ><h3>
                  Quanity : {{ exItem[0].quanity }}
                  <v-icon small> mdi-package-variant-closed</v-icon>
                </h3>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title><h3>Description :</h3></v-list-item-title>
              <v-list-item-subtitle> </v-list-item-subtitle>
              <v-textarea
                color="gray"
                readonly
                outlined
                name="input-7-4"
                :value="exItem[0].des"
              ></v-textarea>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col v-if="currentuser[0].userId != exItem[0].ownerId">
        <v-btn
          block
          :to="{
            name: 'Profile-ProId',
            params: { ProId: exItem[0].ownerId },
          }"
          >Veiw post owner
        </v-btn>
      </v-col>
      <v-col v-else>
        <v-btn @click="edit = true">edit</v-btn>
        <v-btn>deleate</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { auth } from '~/plugins/FirebaseConfig.js'
import firebase from 'firebase/app'
import { db } from '~/plugins/FirebaseConfig.js'
export default {
  data: () => ({
    edit: false,
    myId: '',
    exItem: [
      { img: '' },
      { name: '' },
      { price: '' },
      { des: '' },
      { ownername: '' },
      { status: '' },
      { date: '' },
      { quanity: '' },
    ],
    currentuser: [{ userId: '' }],
  }),

  created() {
    this.getData()
    this.getuser()
  },

  methods: {
    getData() {
      db.collection('Items')
        .where('itemId', '==', this.$route.params.id)
        .onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.exItem = data
        })
    },
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
              this.currentuser = data
            })
        }
      })
    },
  },
}
</script>