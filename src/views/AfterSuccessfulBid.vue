<template>
  <div>
    <div v-if="ticket.vipfinished && ticket.bidderfinished">
      この取引は終了しました
    </div>
    <div v-else>
      <h1>落札後の画面です</h1>
      <chat></chat>
      <Transaction v-bind:ticket="ticket"></Transaction>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Chat from '../components/Chat.vue'
import Transaction from '../components/Transaction.vue'

export default {
  components: { Chat, Transaction },
  data() {
    return {
      ticket: {},
    }
  },

  created() {
    firebase
      .firestore()
      .collection('tickets')
      .doc(this.$route.params.id)
      .get()
      .then((snapshot) => {
        this.ticket = {
          id: snapshot.id,
          ...snapshot.data(),
        }
      })
  },
}
</script>
