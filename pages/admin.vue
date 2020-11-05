<template>
  <div>
    <v-card>
      <v-card-title>
        <header>Product</header>
      </v-card-title>
      <v-card-title>
        <v-text-field
          v-model="itemsearch"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="dataList"
        :search="itemsearch"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="deleteItem(item.itemId)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-card>
      <v-card-title>
        <header>User</header>
      </v-card-title>
      <v-card-title>
        <v-text-field
          v-model="searchuser"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="userheaders"
        :items="userList"
        :search="searchuser"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="deleteUser(item.userId)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import { auth } from '~/plugins/FirebaseConfig.js'
import firebase from 'firebase/app'
import { db } from '~/plugins/FirebaseConfig.js'
export default {
  data: () => ({
    searchuser: '',
    itemsearch: '',
    dataList: [],
    userList: [],
    headers: [
      {
        text: 'ID',
        align: 'start',
        value: 'itemId',
      },
      { text: 'Itemname', value: 'name' },
      { text: 'Price', value: 'price' },
      { text: 'Status', value: 'status' },
      { text: 'Owner', value: 'ownername' },
      { text: 'Time', value: 'date' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    userheaders: [
      {
        text: 'ID',
        align: 'start',
        value: 'userId',
      },
      { text: 'UserName', value: 'UserName' },
      { text: 'Email', value: 'email' },
      { text: 'Password', value: 'password' },
      { text: 'Phone', value: 'Phonenumber' },
      { text: 'Time', value: 'date' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),

  created() {
    this.getData()
    this.getuserData()
    this.checklogin()
  },

  methods: {
    getData() {
      db.collection('Items').onSnapshot((querySnapshot) => {
        var data = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data())
        })
        this.dataList = data
      })
    },
    getuserData() {
      db.collection('Users')
        .orderBy('timestamp')
        .onSnapshot((querySnapshot) => {
          var data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.userList = data
        })
    },
    deleteUser(item) {
      if (confirm('Are you sure?' + item)) {
        db.collection('Users').doc(item).delete()
        db.collection('Items')
          .where('ownerId', '==', item)
          .get()
          .then((querySnapshot) => {
            var batch = db.batch()
            querySnapshot.forEach((doc) => {
              batch.delete(doc.ref)
            })
            return batch.commit()
          })
      }
    },

    deleteItem(item) {
      if (confirm('Are you sure?')) {
        db.collection('Items').doc(item).delete()
      }
    },
    checklogin() {
      var data = auth.onAuthStateChanged((user) => {
        if (!user) {
          this.$router.replace('/')
        }
      })
    },
  },
}
</script>