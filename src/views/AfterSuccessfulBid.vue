<template>
  <div>
    <h1>落札後の画面です</h1>
    <button @click="transactionDone">取引完了ボタン</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  methods: {
    transactionDone() {
      const ticketRef = firebase
        .firestore()
        .collection('tickets')
        .doc(this.$route.params.id)

      ticketRef.get().then((snapshot) => {
        if (firebase.auth().currentUser.uid == snapshot.data().bidderUID) {
          ticketRef.update({
            bidderDone: true,
          })
        } else if (firebase.auth().currentUser.uid == snapshot.data().vipUID) {
          ticketRef.update({
            vipDone: true,
          })
        }
      })
    },
  },
}
</script>
