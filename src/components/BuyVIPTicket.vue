<template>
  <div class="bid">
    <div class="bid-price-box">
      <div class="bid-price-box__front">￥</div>
      <input class="bid__price" type="text" v-model="inputPrice" size="" />
      <div class="bid-price-box__end">円</div>
    </div>
    <button class="bid__button" v-on:click="bidTicket">入札</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      inputPrice: 0,
    }
  },
  // inputに初期値入れる処理
  created() {
    firebase
      .firestore()
      .collection('tickets')
      .doc(this.$route.params.id)
      .get()
      .then((snapshot) => {
        this.inputPrice = snapshot.data().price
      })
  },

  methods: {
    bidTicket() {
      // ログインしているか判定
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const ticketRef = firebase
            .firestore()
            .collection('tickets')
            .doc(this.$route.params.id)
          ticketRef.get().then(async (snapshot) => {
            // 落札済みか判定
            if (!snapshot.data().successfulBid) {
              // 入札金額>現在価格かどうか判定
              if (this.inputPrice > snapshot.data().price) {
                await ticketRef.update({
                  price: this.inputPrice,
                  bidderUID: firebase.auth().currentUser.uid,
                })
                alert('入札が完了しました'), location.reload()
              } else {
                alert('入札金額が足りません')
              }
            } else {
              alert('落札済みです')
            }
          })
        } else {
          alert('ログインしてください')
        }
      })
    },
  },
}
</script>
<style scoped>
.bid {
  display: flex;
  width: 45%;
}
.bid__button {
  background-color: #64b5f6;
  color: white;
  margin: 1%;
  font-weight: bold;
  width: 30%;
  border-radius: 10px;
  font-size: 200%;
}
.bid__button:hover {
  opacity: 0.8;
}
.bid-price-box {
  display: flex;
  align-items: center;
  width: 70%;
}
.bid-price-box__front {
  font-size: 300%;
}
.bid-price-box__end {
  font-size: 120%;
}
.bid__price {
  font-weight: bold;
  font-size: 300%;
  height: 100%;
  width: 100%;
  border: #f7f7f8 solid;
  border-radius: 10px;
}
</style>
