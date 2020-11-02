<template>
  <v-container>
    <v-form
      @submit.prevent="addData"
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-row>
        <v-col md="5">
          <v-text-field
            outlined
            v-model="name"
            style="2"
            label="Items"
            :rules="[(v) => !!v || 'Name is required']"
            required
          ></v-text-field>
          <v-text-field
            outlined
            v-model="price"
            type="number"
            style="1"
            label="price"
            :rules="[(v) => !!v || 'Price is required']"
            required
          ></v-text-field>
          <v-text-field
            outlined
            v-model="quantity"
            type="number"
            style="1"
            label="Quanity"
            :rules="[(v) => !!v || 'Quanity is required']"
            required
          ></v-text-field>
          <v-item-group>
            <v-checkbox
              outlined
              v-model="status"
              value="WantToBuy"
              label="WantToBuy"
              :rules="[(v) => !!v || 'Plese select one']"
              required
            ></v-checkbox>
            <v-checkbox
              v-model="status"
              value="WantToSell"
              label="WantToSell"
              :rules="[(v) => !!v || 'Plese select one']"
              required
            ></v-checkbox>
          </v-item-group>
        </v-col>
        <v-col>
          <v-textarea
            label="Description"
            v-model="Description"
            clearable
            clear-icon="mdi-close-circle"
            primary
            outlined
          ></v-textarea>
        </v-col>
      </v-row>
      <v-file-input
        v-model="files"
        :rules="[(v) => !!v || 'image is required']"
        color="deep-purple accent-4"
        counter
        label="File input"
        multiple
        placeholder="Select your files"
        prepend-icon="mdi-paperclip"
        outlined
        hint="select mutiple file in one time"
        :show-size="1000"
        persistent-hint
      >
        <template v-slot:selection="{ index, text }">
          <v-chip
            v-if="index < 2"
            color="deep-purple accent-4"
            dark
            label
            small
          >
            {{ text }}
          </v-chip>

          <span
            v-else-if="index === 2"
            class="overline grey--text text--darken-3 mx-2"
          >
            +{{ files.length - 2 }} File(s)
          </span>
        </template>
      </v-file-input>
      <v-progress-linear
        color="cyan"
        :value="uploadValue"
        max="100"
      ></v-progress-linear>
      <br />
      <v-btn class="mr-4" :disabled="!valid" @click="onUpload"> Submit </v-btn>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline"> Your order is placed </v-card-title>
          <v-card-text> We hope you can get a good deal! </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              Disagree
            </v-btn>
            <v-btn color="green darken-1" text @click="dialog = false">
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn color="warning" class="mr-4" @click="reset"> Reset Form </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { db } from '~/plugins/FirebaseConfig.js'
import { storage } from '~/plugins/FirebaseConfig.js'
import firebase from 'firebase/app'
import { auth } from '~/plugins/FirebaseConfig.js'
export default {
  data: function () {
    return {
      quantity: '',
      files: [],
      Description: '',
      picker: '',
      img: undefined,
      picture: [],
      uploadValue: 0,
      name: '',
      status: '',
      price: '',
      valid: true,
      dialog: false,
      phone: '',
    }
  },
  methods: {
    addData() {
      if (this.name && this.price && this.status) {
        var dataText = {
          quantity: this.quantity,
          name: this.name,
          status: this.status,
          price: this.price,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          ownerId: this.$store.getters.currentuser.userId,
          ownername: this.$store.getters.currentuser.username,
          itemId: db.collection('Items').doc().id,
          img: this.picture,
          des: this.Description,
          date: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
        }
        db.collection('Items')
          .doc(dataText.itemId)
          .set(dataText)
          .catch(function (error) {
            console.error('Error writing document: ', error)
          })
        this.$refs.form.reset()
        this.dialog = true
        this.picture = []
        this.uploadValue = 0
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    checkuser() {
      var data = auth.onAuthStateChanged((user) => {
        if (!user) {
          this.$router.replace('/')
        }
      })
    },
    onUpload() {
      this.$refs.form.validate()
      for (var i = 0; i < this.files.length; i++) {
        let userId = firebase.auth().currentUser.uid
        let file = this.files[i]
        var storageRef = firebase
          .storage()
          .ref('ImageItems/' + userId)
          .child(file.name)
        let uploadTask = storageRef.put(file)
        this.picture = []
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          },
          (error) => {
            // eslint-disable-next-line no-undef
            console.log(error, message)
          },
          () => {
            this.uploadValue = 100
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
              this.picture.push(url)
              console.log(this.picture)
              this.addData()
            })
          }
        )
      }
    },
  },
  created() {
    this.checkuser()
  },
}
</script>

<style scoped>
img.preview {
  width: 200px;
}
</style>