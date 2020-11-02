<template>
  <div>
    <div>
      <v-file-input
        label="File input"
        filled
        prepend-icon="mdi-camera"
        v-model="img"
      ></v-file-input>
    </div>
    <div>
      <p>
        Progress: {{ uploadValue.toFixed() + '%' }}
        <v-progress-linear
          color="cyan"
          :value="uploadValue"
          max="100"
        ></v-progress-linear>
      </p>
    </div>
    <div>
      <button @click="onUpload">Upload</button>
      <br />
      <img class="preview" :src="picture" />
    </div>
  </div>
</template>
<script>
import firebase from 'firebase/app'
import { storage } from '~/plugins/FirebaseConfig.js'
export default {
  name: 'Upload',
  data() {
    return {
      img: null,
      picture: null,
      uploadValue: 0,
    }
  },
  methods: {
    onUpload() {
      this.picture = null
      const storageRef = firebase
        .storage()
        // eslint-disable-next-line no-template-curly-in-string
        .ref('ImageItems')
        .child(this.img.name)
        .put(this.img)
      storageRef.on(
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
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url
          })
        }
      )
    },
  },
}
</script>
<style scoped>
img.preview {
  width: 200px;
}
</style>