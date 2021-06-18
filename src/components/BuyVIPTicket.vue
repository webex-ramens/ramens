<template>
  <div>
    <input type="number" v-model="inputPrice" />
    <button v-on:click="bidTicket">入札する</button>
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
                alert('入札金額>現在価格です')
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
