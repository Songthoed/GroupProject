<template>
  <div>
    <v-container class="grey lighten-5 hidden-sm-and-down">
      <v-row>
        <v-col md="3">
          <v-row>
            <v-card width="100%">
              <v-img
                :src="currentuser[0].img"
                height="200"
                contain
                class="grey lighten-2"
              ></v-img>
              <v-card-title class="title">
                <v-text-field
                  v-model="currentuser[0].UserName"
                  readonly
                ></v-text-field>
              </v-card-title>
            </v-card>
          </v-row>
          <br />
          <v-row>
            <v-card width="400">
              <v-card-title class="white--text orange darken-4 justify-center">
                My Post
              </v-card-title>
              <v-card-title>
                <v-list>
                  <v-list-title>Select status</v-list-title>
                  <v-list-subtitle
                    ><v-radio-group v-model="status" column>
                      <v-radio label="Want to sell" value="sell"></v-radio>
                      <v-radio label="Want to buy" value="buy"></v-radio>
                    </v-radio-group>
                  </v-list-subtitle>
                </v-list>
              </v-card-title>
              <v-divider></v-divider>
              <div v-if="status == 'sell'">
                <v-virtual-scroll
                  :items="mySellItems"
                  item-height="50"
                  height="300"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-btn
                          depressed
                          icon
                          small
                          :to="{
                            name: 'Item-id',
                            params: { id: item.itemId },
                          }"
                        >
                          <v-icon color="orange darken-4" small>
                            mdi-open-in-new
                          </v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
              </div>
              <div v-else>
                <v-virtual-scroll
                  :items="myBuyItems"
                  item-height="50"
                  height="300"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-btn
                          depressed
                          icon
                          small
                          :to="{
                            name: 'Item-id',
                            params: { id: item.itemId },
                          }"
                        >
                          <v-icon color="orange darken-4" small>
                            mdi-open-in-new
                          </v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
              </div>
            </v-card>
          </v-row>
        </v-col>
        <v-spacer></v-spacer>
        <v-col style="text-align: center" md="8">
          <v-row>
            <v-col>
              <v-text-field
                v-model="currentuser[0].name"
                label="FirstName"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="currentuser[0].Lname"
                label="LastName"
                outlined
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="currentuser[0].email"
                label="Email"
                outlined
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="4">
              <v-text-field
                v-model="currentuser[0].IDcard"
                label="IDCard"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col md="1">
              <v-btn @click="lookcard = true">
                <v-icon>mdi-card-account-details-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="currentuser[0].Phonenumber"
                label="PhoneNumber"
                outlined
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="currentuser[0].payment"
                label="PaymentID"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="currentuser[0].Bank"
                label="Bank"
                outlined
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                v-model="currentuser[0].address"
                label="Address"
                outlined
                readonly
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn
                :to="{
                  name: 'chat',
                  query: { q: currentuser[0].userId },
                }"
              >
                chat
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="grey lighten-5 hidden-md-and-up">
      <v-row justify="center" align="center">
        <v-col>
          <v-row justify="center" align="center">
            <v-card width="100%">
              <v-img
                :src="currentuser[0].img"
                height="200"
                contain
                class="grey lighten-2"
              ></v-img>
              <v-card-title class="title">
                <v-text-field
                  v-model="currentuser[0].UserName"
                  readonly
                ></v-text-field>
              </v-card-title>
            </v-card>
          </v-row>
          <br />
          <v-row justify="center" align="center">
            <v-card width="400">
              <v-card-title class="white--text orange darken-4 justify-center">
                My Post
              </v-card-title>
              <v-card-title>
                <v-list>
                  <v-list-title>Select status</v-list-title>
                  <v-list-subtitle
                    ><v-radio-group v-model="status" column>
                      <v-radio label="Want to sell" value="sell"></v-radio>
                      <v-radio label="Want to buy" value="buy"></v-radio>
                    </v-radio-group>
                  </v-list-subtitle>
                </v-list>
              </v-card-title>
              <v-divider></v-divider>
              <div v-if="status == 'sell'">
                <v-virtual-scroll
                  :items="mySellItems"
                  item-height="50"
                  height="300"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-btn
                          depressed
                          icon
                          small
                          :to="{
                            name: 'Item-id',
                            params: { id: item.itemId },
                          }"
                        >
                          <v-icon color="orange darken-4" small>
                            mdi-open-in-new
                          </v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
              </div>
              <div v-else>
                <v-virtual-scroll
                  :items="myBuyItems"
                  item-height="50"
                  height="300"
                >
                  <template v-slot:default="{ item }">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-btn
                          depressed
                          icon
                          small
                          :to="{
                            name: 'Item-id',
                            params: { id: item.itemId },
                          }"
                        >
                          <v-icon color="orange darken-4" small>
                            mdi-open-in-new
                          </v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
              </div>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col style="text-align: center" md="8">
          <v-row>
            <v-col>
              <v-text-field
                v-model="currentuser[0].name"
                label="FirstName"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="currentuser[0].Lname"
                label="LastName"
                outlined
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="currentuser[0].email"
                label="Email"
                outlined
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="4">
              <v-text-field
                v-model="currentuser[0].IDcard"
                label="IDCard"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col md="1">
              <v-btn @click="lookcard = true">
                <v-icon>mdi-card-account-details-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="currentuser[0].Phonenumber"
                label="PhoneNumber"
                outlined
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="currentuser[0].payment"
                label="PaymentID"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="currentuser[0].Bank"
                label="Bank"
                outlined
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                v-model="currentuser[0].address"
                label="Address"
                outlined
                readonly
              ></v-textarea>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="lookcard" max-width="400">
      <v-card>
        <img :src="currentuser[0].idcard" height="100%" width="100%" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { auth, db } from '~/plugins/FirebaseConfig.js'

export default {
  data() {
    return {
      lookcard: false,
      status: 'sell',
      mySellItems: [{ name: '' }, { price: '' }],
      myBuyItems: [{ name: '' }, { price: '' }],
      imgUrl: '',
      fileImage: null,
      userdata: [],
      currentuser: [
        { name: '' },
        { Lname: '' },
        { email: '' },
        { Bank: '' },
        { IDcard: '' },
        { Phonenumber: '' },
        { username: '' },
        { payment: '' },
        { userId: '' },
        { img: '' },
        { address: '' },
      ],
    }
  },
  created() {
    this.getuser()
    this.checkOwner()
  },
  methods: {
    getuser() {
      db.collection('Users')
        .where('userId', '==', this.$route.params.ProId)
        .onSnapshot((querySnapshot) => {
          const data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          const userdata = data
          this.currentuser = data
        })
      db.collection('Items')
        .where('ownerId', '==', this.$route.params.ProId)
        .where('status', '==', 'WantToSell')
        .onSnapshot((querySnapshot) => {
          var data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.mySellItems = data
        })
      db.collection('Items')
        .where('ownerId', '==', this.$route.params.ProId)
        .where('status', '==', 'WantToBuy')
        .onSnapshot((querySnapshot) => {
          var data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.myBuyItems = data
        })
    },
    checkOwner() {
      const data = auth.onAuthStateChanged((user) => {
        if (user.uid == this.$route.params.ProId) {
          this.$router.replace('/MyProfile')
        }
      })
    },
    update() {
      var updatedata = {
        UserName: this.currentuser[0].UserName,
        payment: this.currentuser[0].payment,
        Phonenumber: this.currentuser[0].Phonenumber,
        img: this.currentuser[0].img,
        Bank: this.currentuser[0].Bank,
        address: this.currentuser[0].address,
      }
      db.collection('Users').doc(this.currentuser[0].userId).update(updatedata)
      this.edit = false
      location.reload()
    },
    setdefault() {
      this.edit = false
      this.getuser()
    },
    upload() {
      const storageRef = firebase
        .storage()
        .ref('Profile/' + this.currentuser[0].userId)
        .put(this.fileImage)
      storageRef.on('state_changed', () => {
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.currentuser[0].img = url
        })
      })
    },
  },
}
</script>

<style></style>