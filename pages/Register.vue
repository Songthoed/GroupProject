<template>
  <v-card class="mx-auto" style="max-width: 500px">
    <v-form ref="form" v-model="form" class="pa-4 pt-6">
      <v-text-field
        v-model="name"
        :counter="20"
        :rules="nameRules"
        filled
        color="deep-purple"
        label="First Name"
      ></v-text-field>
      <v-text-field
        v-model="Lname"
        :counter="20"
        :rules="nameRules1"
        filled
        color="deep-purple"
        label="Last Name"
      ></v-text-field>
      <v-text-field
        v-model="UserName"
        :counter="10"
        :rules="userRules"
        filled
        color="deep-purple"
        label="User name"
      ></v-text-field>
      <v-text-field
        v-model="password"
        hint="At least 8 characters"
        :rules="passRules"
        filled
        label="Password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
        required
      ></v-text-field>
      <v-text-field
        v-model="phone"
        filled
        color="deep-purple"
        label="Phone number"
        :rules="[(v) => !!v || 'PhoneNumber is required']"
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        filled
        color="deep-purple"
        label="Email address"
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="IDcard"
        :counter="13"
        :rules="useridRules"
        filled
        color="deep-purple"
        label="ID card number"
      ></v-text-field>
      <v-select
        :items="[
          'ธนาคารกรุงเทพ‎',
          'ธนาคารกรุงไทย',
          'ธนาคารกรุงศรีอยุธยา',
          'ธนาคารกสิกรไทย',
          'ธนาคารทหารไทย',
          'ธนาคารไทยพาณิชย์',
          'ธนาคารออมสิน',
          'ธนาคารซีไอเอ็มบีไทย',
        ]"
        label="Bank"
        v-model="bank"
        :rules="[(v) => !!v || 'Plase select one']"
        filled
        required
      ></v-select>
      <v-text-field
        v-model="payment"
        :rules="paymentRules"
        filled
        color="deep-purple"
        label="Payment"
      ></v-text-field>
      <v-textarea
        :rules="addressRules"
        name="Address"
        filled
        label="Address"
        auto-grow
        v-model="address"
      ></v-textarea>
      <div>
        <div>
          <v-row justify="center" align="center">
            <v-col md="9">
              <v-file-input
                v-model="fileimage"
                label=" imageData"
                filled
                prepend-icon="mdi-camera"
              ></v-file-input>
            </v-col>
            <v-col>
              <v-btn @click="exdia = true"
                ><v-icon>mdi-help-circle-outline</v-icon></v-btn
              ></v-col
            >
          </v-row>
        </div>
        <div>
          <v-btn @click="onUpload">Upload</v-btn>
        </div>
      </div>
      <v-checkbox
        v-model="agreement"
        :rules="[(v) => !!v || 'You must agree to continue!']"
        color="deep-purple"
      >
        <template v-slot:label>
          I agree to the&nbsp;
          <a href="#" @click.stop.prevent="dialog = true">Terms of Service</a>
        </template>
      </v-checkbox>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text @click="reset"> Clear </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="deep-purple accent-4"
        @click="addData"
        depressed
      >
        Submit
      </v-btn>
    </v-card-actions>
    <v-dialog v-model="dialog" absolute max-width="400" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-3"> Legal </v-card-title>
        <v-card-text>
          คุณยอมรับว่าคุณใช้เว็บไซต์นี้โดยรับผิดชอบความเสี่ยงด้วยตนเอง เนื้อหา
          บริการ และข้อมูลใดๆ ในเว็บไซต์นี้จัดหาให้ "ตามสภาพที่เป็นอยู่" และ
          "ตามที่มี" โดยไม่ได้เป็นการชี้แจงข้อเท็จจริงหรือการรับประกันใดๆ
          ไม่ว่าโดยชัดแจ้ง โดยนัย หรือตามกฎหมาย เรามิได้ชี้แจงข้อเท็จจริง
          รับประกัน หรือรับรองในความถูกต้อง ความน่าเชื่อถือ ประโยชน์
          หรือความครบถ้วนสมบูรณ์ของบริการ เนื้อหา
          หรือข้อมูลในเว็บไซต์หรือเว็บไซต์ใดๆ ที่เชื่อมโยงกับเว็บไซต์นี้
          ภายใต้ขอบเขตสูงสุดที่กฎหมายอนุญาต เราขอสงวนสิทธิ์การรับประกันใดๆ
          ทั้งปวง ไม่ว่าโดยชัดแจ้งหรือโดยนัย
          รวมถึงแต่ไม่จำกัดเฉพาะการรับประกันโดยนัยว่าสามารถขายได้
          ความเหมาะสมสำหรับจุดประสงค์ใดโดยเฉพาะ กรรมสิทธิ์ การไม่ละเมิดลิขสิทธิ์
          การออกแบบ ความถูกต้องแม่นยำ ขีดความสามารถ ความเพียงพอ ความเหมาะสม
          ความจุ ความครบถ้วนสมบูรณ์ การมีพร้อมให้บริการ
          ความเข้ากันได้หรือผลที่เกิดจากการทำข้อตกลงหรือแนวทางการปฏิบัติงาน
          เราไม่รับประกันว่าเว็บไซต์ หรือบริการ เนื้อหา
          ข้อมูลหรือฟังก์ชันที่มีในเว็บไซต์นี้จะมีให้บริการอย่างต่อเนื่อง
          ไม่หยุดชะงัก หรือปราศจากข้อบกพร่อง
          รับประกันว่าข้อบกพร่องจะได้รับการแก้ไข หรือเว็บไซต์ บริการ เนื้อหา
          ข้อมูลหรือบริการที่ทำให้เกิดเว็บไซต์ หรือบริการ เนื้อหา
          และข้อมูลดังกล่าวจะพร้อมให้บริการโดยปราศจากไวรัสหรือเนื้อหาที่เป็นอันตรายอื่นๆ
          หรือมีความถูกต้องแม่นยำหรือครบถ้วนสมบูรณ์
          เราไม่รับประกันหรือชี้แจงข้อเท็จจริงใดๆ
          เกี่ยวกับการใช้งานหรือผลของการใช้บริการ เนื้อหา ข้อมูล ฟังก์ชัน
          หรือผลิตภัณฑ์ที่มีให้ผ่านเว็บไซต์ในแง่ของความถูกต้อง ความแม่นยำ
          ความน่าเชื่อถือ หรืออื่นๆ คุณต้องรับผิดชอบต่อต้นทุนทั้งหมดของการบริการ
          การซ่อมบำรุง หรือการแก้ไขที่จำเป็นทั้งหมด
          กฎหมายที่ใช้บังคับอาจไม่อนุญาตให้ยกเว้นการรับประกันโดยนัย ดังนั้น
          การสงวนสิทธิ์ข้างต้นอาจไม่ใช้บังคับกับกรณีของคุณ
          ในกรณีที่เราต้องรับผิดต่อความเสียหายใดๆ ที่เกี่ยวข้องกับเรื่องดังกล่าว
          วิธีการแก้ไขเยียวยาที่คุณได้รับสิทธิแต่เพียงผู้เดียวนี้จะจำกัดเฉพาะการชำระคืนสำหรับผลิตภัณฑ์หรือบริการที่คุณได้ชำระเงินให้แก่องค์กร
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn text @click=";(agreement = false), (dialog = false)">
            No
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="white--text"
            color="deep-purple accent-4"
            @click=";(agreement = true), (dialog = false)"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="errordialog" max-width="400">
      <v-card>
        <v-card-title class="headline"> Sonmthing wrong </v-card-title>
        <v-card-text> {{ error }} </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="errordialog = false">
            Try again
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="exdia" max-width="400">
      <v-card>
        <img :src="excard" height="100%" width="100%" />
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import { db } from '~/plugins/FirebaseConfig.js'
import firebase from 'firebase/app'
import { auth } from '~/plugins/FirebaseConfig.js'
export default {
  data: function () {
    return {
      exdia: false,
      excard: 'https://i.imgur.com/CH7DcJg.jpg',
      fileimage: '',
      imageurl: '',
      img: 'https://i.imgur.com/BpdjLdB.jpg',
      error: '',
      successdialog: false,
      errordialog: false,
      name: '',
      Lname: '',
      UserName: '',
      IDcard: '',
      payment: '',
      password: '',
      phone: '',
      email: '',
      agreement: false,
      dialog: false,
      Redialog: false,
      form: false,
      bank: undefined,
      isLoading: false,
      admin: false,
      show: false,
      address: null,
      nameRules: [
        (v) => !!v || 'First name is required',
        (v) =>
          (v && v.length <= 20) || 'First Name must be less than 20 characters',
      ],
      nameRules1: [
        (v) => !!v || 'Last name is required',
        (v) =>
          (v && v.length <= 20) || 'Last Name must be less than 20 characters',
      ],
      userRules: [
        (v) => !!v || 'User  name is required',
        (v) =>
          (v && v.length <= 10) || 'User Name must be less than 10 characters',
      ],
      passRules: [
        (v) => !!v || 'Password is required',
        (v) =>
          (v && v.length >= 8) || 'Password must be more than 8 characters',
      ],
      useridRules: [
        (v) => !!v || 'UserID is required',
        (v) => (v && v.length == 13) || 'UserID must be 13 characters',
      ],
      paymentRules: [(v) => !!v || 'Payment is required'],
      addressRules: [(v) => !!v || 'address is required'],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    }
  },
  methods: {
    addData() {
      this.$refs.form.validate()
      this.Redialog = true
      var userdata = {
        name: this.name,
        Lname: this.Lname,
        UserName: this.UserName,
        IDcard: this.IDcard,
        payment: this.payment,
        password: this.password,
        email: this.email,
        Phonenumber: this.phone,
        Bank: this.bank,
        address: this.address,
        img: this.img,
        admin: this.admin,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        date: new Date().toJSON().slice(0, 10).replace(/-/g, '/'),
        idcard: this.imageurl,
      }
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          var user = firebase.auth().currentUser
          var userID = { userId: user.uid }
          db.collection('Users').doc(user.uid).set(userdata)
          db.collection('Users').doc(user.uid).update(userID)
          this.$refs.form.reset()
          this.$rounter.replace('/')
        })
        .catch((error) => {
          var errorMessage = error.message
          this.error = errorMessage
          this.errordialog = true
        })
    },
    reset() {
      this.$refs.form.reset()
    },
    checklogin() {
      var data = auth.onAuthStateChanged((user) => {
        if (user) {
          this.$router.replace('/')
        }
      })
    },
    onUpload() {
      const storageRef = firebase
        .storage()
        // eslint-disable-next-line no-template-curly-in-string
        .ref('IdCard/' + this.fileimage.name)
        .put(this.fileimage)
      storageRef.on('state_changed', () => {
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          this.imageurl = url
        })
      })
    },
  },
  created() {
    this.checklogin()
  },
}
</script>