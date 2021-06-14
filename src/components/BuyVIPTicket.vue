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
      const ticketRef = firebase
        .firestore()
        .collection('tickets')
        .doc(this.$route.params.id)

      ticketRef.get().then(async (snapshot) => {
        if (this.inputPrice > snapshot.data().price) {
          await ticketRef.update({ price: this.inputPrice })
          alert('入札が完了しました'), location.reload()
        } else {
          alert('入力内容に誤りがあります')
        }
      })
    },
  },
}
</script>
