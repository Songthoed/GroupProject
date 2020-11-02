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
        ></v-text-field>
      </v-col>
    </v-row>
    <div class="hidden-sm-and-down">
      <v-row justify="center">
        <v-col>
          <h1>WantToSell</h1>
          <div v-if="filterSellCard() == ''">
            <v-row justify="center" align="center">
              <v-img
                src="https://i.imgur.com/O5b04i7.png"
                height="390"
                width="390"
              ></v-img>
            </v-row>
          </div>
          <div v-else>
            <v-card
              class="mx-auto"
              max-width="350"
              height="370"
              v-for="items in filterSellCard()"
              :key="items.itemId"
            >
              <v-img :src="items.img[0]" height="200px"></v-img>
              <v-card-title> {{ items.name }}</v-card-title>
              <v-card-subtitle> ฿ {{ items.price }} </v-card-subtitle>

              <v-card-actions>
                <v-btn
                  color="orange lighten-2"
                  text
                  :to="{ name: 'Item-id', params: { id: items.itemId } }"
                >
                  Explore
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
        <v-divider inset vertical></v-divider>
        <v-col>
          <h1>WantToBuy</h1>
          <div v-if="filterBuyCard() == ''">
            <v-row justify="center" align="center">
              <v-img
                src="https://i.imgur.com/O5b04i7.png"
                height="390"
                width="390"
              ></v-img>
            </v-row>
          </div>
          <div v-else>
            <v-card
              class="mx-auto"
              max-width="350"
              height="370"
              v-for="items in filterBuyCard()"
              :key="items.itemId"
            >
              <v-img :src="items.img[0]" height="200px"></v-img>
              <v-card-title> {{ items.name }} </v-card-title>
              <v-card-subtitle> ฿ {{ items.price }} </v-card-subtitle>
              <v-card-actions>
                <v-btn
                  color="orange lighten-2"
                  text
                  :to="{ name: 'Item-id', params: { id: items.itemId } }"
                >
                  Explore
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="hidden-md-and-up">
      <v-row justify="center">
        <v-col>
          <v-radio-group v-model="status" row>
            <v-col outlined align="center" justify="center">
              <v-radio
                active-class="grey darken-2"
                class="grey lighten-2"
                label="Sell"
                value="sell"
                color="white"
              ></v-radio>
            </v-col>
            <v-col>
              <v-radio
                color="white"
                label="Buy"
                value="buy"
                size="md"
                class="grey lighten-2"
                active-class="grey darken-2"
              ></v-radio>
            </v-col>
          </v-radio-group>
          <div v-if="status == 'sell'">
            <v-row no-gutters>
              <h1>Want To Sell</h1>
            </v-row>
            <div v-if="filterSellCard() == ''">
              <v-row justify="center" align="center">
                <v-img
                  src="https://i.imgur.com/O5b04i7.png"
                  height="390"
                  width="390"
                ></v-img>
              </v-row>
            </div>
            <div v-else>
              <v-card
                class="mx-auto"
                max-width="350"
                height="370"
                v-for="items in filterSellCard()"
                :key="items.itemId"
              >
                <v-img :src="items.img[0]" height="200px"></v-img>
                <v-card-title> {{ items.name }}</v-card-title>
                <v-card-subtitle> ฿ {{ items.price }} </v-card-subtitle>
                <v-card-actions>
                  <v-btn
                    color="orange lighten-2"
                    text
                    :to="{ name: 'Item-id', params: { id: items.itemId } }"
                  >
                    Explore
                  </v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </div>
          <div v-else>
            <v-row no-gutters>
              <h1>Want To Buy</h1>
            </v-row>
            <div v-if="filterBuyCard() == ''">
              <v-row justify="center" align="center">
                <v-img
                  src="https://i.imgur.com/O5b04i7.png"
                  height="390"
                  width="390"
                ></v-img>
              </v-row>
            </div>
            <div v-else>
              <v-card
                class="mx-auto"
                max-width="350"
                height="370"
                v-for="items in filterBuyCard()"
                :key="items.itemId"
              >
                <v-img :src="items.img[0]" height="200px"></v-img>
                <v-card-title> {{ items.name }} </v-card-title>
                <v-card-subtitle> ฿ {{ items.price }} </v-card-subtitle>
                <v-card-actions>
                  <v-btn
                    color="orange lighten-2"
                    text
                    :to="{ name: 'Item-id', params: { id: items.itemId } }"
                  >
                    Explore
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </div>
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
      status: 'sell',
      buyList: [],
      sellList: [],
    }
  },
  methods: {
    getsellItems() {
      db.collection('Items')
        .where('status', '==', 'WantToSell')
        .onSnapshot((querySnapshot) => {
          var data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.sellList = data
        })
    },
    getbuyItems() {
      db.collection('Items')
        .where('status', '==', 'WantToBuy')
        .onSnapshot((querySnapshot) => {
          var data = []
          querySnapshot.forEach((doc) => {
            data.push(doc.data())
          })
          this.buyList = data
        })
    },
    filterSellCard() {
      return this.sellList.filter((card) => {
        return card.name.toLowerCase().match(this.search.toLowerCase())
      })
    },
    filterBuyCard() {
      return this.buyList.filter((card) => {
        return card.name.toLowerCase().match(this.search.toLowerCase())
      })
    },
  },
  created() {
    this.getbuyItems()
    this.getsellItems()
  },
  computed() {
    this.filterSellCard()
    this.filterBuyCard()
  },
}
</script>

<style>
</style>