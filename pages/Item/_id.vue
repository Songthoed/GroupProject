<template>
  <div>
    <v-container class="grey lighten-5 hidden-sm-and-down">
      <v-row v-if="edit == false">
        <v-col md="6">
          <v-row>
            <v-carousel height="400">
              <v-carousel-item
                v-for="(img, i) in exItem[0].img"
                :key="i"
                :src="img"
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
            </v-carousel>
          </v-row>
          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              <div v-if="currentuser[0].userId != exItem[0].ownerId">
                <v-btn
                  block
                  :to="{
                    name: 'Profile-ProId',
                    params: { ProId: exItem[0].ownerId },
                  }"
                  >Veiw post owner
                </v-btn>
              </div>
              <div v-else>
                <v-btn @click="edit = true"
                  ><v-icon>mdi-pencil</v-icon>edit</v-btn
                >
                <v-btn @click="deleteItem">
                  <v-icon>mdi-trash-can</v-icon>
                  deleate
                </v-btn>
              </div>
            </v-col>
          </v-row>
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
                    Quantity : {{ exItem[0].quantity }}
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
                  v-model="exItem[0].des"
                ></v-textarea>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col md="6">
          <v-row>
            <v-carousel height="400">
              <v-carousel-item
                v-for="(img, i) in exItem[0].img"
                :key="i"
                :src="img"
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
            </v-carousel>
          </v-row>
          <br />
          <v-row justify="center" align="center">
            <v-btn @click="update"><v-icon>mdi-content-save</v-icon>save</v-btn>
            <v-btn @click="setdefault"
              ><v-icon>mdi-content-save-off</v-icon>
              cancel
            </v-btn>
            <v-btn @click="deleteItem"
              ><v-icon>mdi-trash-can</v-icon>deleate
            </v-btn>
          </v-row>
        </v-col>
        <v-col md="6">
          <v-card class="mx-auto" tile>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>
                  <v-text-field
                    outlined
                    v-model="exItem[0].name"
                  ></v-text-field>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <h4>{{ exItem[0].status }}</h4>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-row>
                    <v-col md="2">
                      <h3>Price :</h3>
                    </v-col>
                    <v-col md="5">
                      <v-text-field outlined v-model="exItem[0].price">
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  ><v-row>
                    <v-col md="2">
                      <h3>Quantity:</h3>
                    </v-col>
                    <v-col md="5">
                      <v-text-field outlined v-model="exItem[0].quantity">
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title><h3>Description :</h3></v-list-item-title>
                <v-list-item-subtitle> </v-list-item-subtitle>
                <v-textarea
                  color="gray"
                  outlined
                  name="input-7-4"
                  v-model="exItem[0].des"
                ></v-textarea>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="grey lighten-5 hidden-md-and-up">
      <div v-if="edit == false">
        <v-row>
          <v-carousel height="400">
            <v-carousel-item
              v-for="(img, i) in exItem[0].img"
              :key="i"
              :src="img"
              reverse-transition="fade-transition"
              transition="fade-transition"
            ></v-carousel-item>
          </v-carousel>
        </v-row>

        <v-col align="center" justify="center">
          <div v-if="currentuser[0].userId != exItem[0].ownerId">
            <v-btn
              block
              :to="{
                name: 'Profile-ProId',
                params: { ProId: exItem[0].ownerId },
              }"
              >Veiw post owner
            </v-btn>
          </div>
          <div v-else>
            <v-btn @click="edit = true"><v-icon>mdi-pencil</v-icon>edit</v-btn>
            <v-btn @click="deleteItem">
              <v-icon>mdi-trash-can</v-icon>
              deleate
            </v-btn>
          </div>
        </v-col>

        <v-row>
          <v-col md="12">
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
                      Quanity : {{ exItem[0].quantity }}
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
                    v-model="exItem[0].des"
                  ></v-textarea>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-col md="6">
          <v-row>
            <v-carousel height="400">
              <v-carousel-item
                v-for="(img, i) in exItem[0].img"
                :key="i"
                :src="img"
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
            </v-carousel>
          </v-row>
          <br />
          <v-row justify="center" align="center">
            <v-btn @click="update"><v-icon>mdi-content-save</v-icon>save</v-btn>
            <v-btn @click="setdefault"
              ><v-icon>mdi-content-save-off</v-icon>
              cancel
            </v-btn>
            <v-btn @click="deleteItem"
              ><v-icon>mdi-trash-can</v-icon>deleate
            </v-btn>
          </v-row>
        </v-col>
        <v-col md="6">
          <v-card class="mx-auto" tile>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title>
                  <v-text-field
                    outlined
                    v-model="exItem[0].name"
                  ></v-text-field>
                </v-list-item-title>
                <v-list-item-subtitle>
                  <h4>{{ exItem[0].status }}</h4>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-row>
                    <v-col md="2">
                      <h3>Price :</h3>
                    </v-col>
                    <v-col md="5">
                      <v-text-field outlined v-model="exItem[0].price">
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  ><v-row>
                    <v-col md="2">
                      <h3>Quantity:</h3>
                    </v-col>
                    <v-col md="5">
                      <v-text-field outlined v-model="exItem[0].quantity">
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title><h3>Description :</h3></v-list-item-title>
                <v-list-item-subtitle> </v-list-item-subtitle>
                <v-textarea
                  color="gray"
                  outlined
                  name="input-7-4"
                  v-model="exItem[0].des"
                ></v-textarea>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </div>
    </v-container>
  </div>
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
      { quantity: '' },
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
    deleteItem() {
      if (confirm('Are you sure?')) {
        db.collection('Items').doc(this.$route.params.id).delete()
        this.$router.replace('/')
      }
    },
    update() {
      var updatedata = {
        des: this.exItem[0].des,
        name: this.exItem[0].name,
        price: this.exItem[0].price,
        quantity: this.exItem[0].quantity,
      }
      db.collection('Items')
        .doc(this.exItem[0].itemId)
        .update(updatedata)
        .then(() => {
          console.log(updatedata)
        })
      this.edit = false
    },
    setdefault() {
      this.edit = false
      this.getData()
    },
  },
}
</script>