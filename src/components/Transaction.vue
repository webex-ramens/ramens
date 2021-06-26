<template>
  <div>
    <div v-if="ticket.vipfinished && ticket.vipUID == currentUser.uid">
      ありがとうございました。
    </div>
    <div
      v-else-if="ticket.bidderfinished && ticket.bidderUID == currentUser.uid"
    >
      ありがとうございました。
    </div>

    <div v-else-if="ticket.bidderDone && ticket.vipDone">
      <p>評価してください</p>
      <button @click="good">good</button>
      <button @click="bad">bad</button>
    </div>
    <div v-else-if="currentUser.uid == ticket.bidderUID && ticket.bidderDone">
      インフルエンサーの取引が完了したら評価をつけることができます
    </div>
    <div v-else-if="currentUser.uid == ticket.vipUID && ticket.vipDone">
      購入者の取引が完了したら評価をつけることができます
    </div>
    <button @click="transactionDone" v-else>取引完了</button>
  </div>
</template>
<script>
import firebase from 'firebase'
export default {
  props: ['ticket'],
  methods: {
    transactionDone() {
      const ticketRef = firebase
        .firestore()
        .collection('tickets')
        .doc(this.$route.params.id)

      ticketRef.get().then(async (snapshot) => {
        if (firebase.auth().currentUser.uid == snapshot.data().bidderUID) {
          await ticketRef.update({
            bidderDone: true,
          })
        } else if (firebase.auth().currentUser.uid == snapshot.data().vipUID) {
          await ticketRef.update({
            vipDone: true,
          })
        }
        alert('取引完了が完了しました')
        location.reload()
      })
    },
    good() {
      const userRef = firebase.firestore().collection('users')
      if (this.$auth.currentUser.uid == this.ticket.vipUID) {
        userRef
          .where('uid', '==', this.ticket.bidderUID)
          .get()
          .then(async (snapshot) => {
            let id = snapshot.docs[0].id
            if (!snapshot.docs[0].data().good) {
              userRef.doc(id).update({
                good: 1,
              })
            } else {
              userRef.doc(id).update({
                good: snapshot.docs[0].data().good + 1,
              })
            }
            await firebase
              .firestore()
              .collection('tickets')
              .doc(this.$route.params.id)
              .update({
                vipfinished: true,
              })
            alert('評価が完了しました')
            location.reload()
          })
      } else if (this.$auth.currentUser.uid == this.ticket.bidderUID) {
        userRef
          .where('uid', '==', this.ticket.vipUID)
          .get()
          .then(async (snapshot) => {
            let id = snapshot.docs[0].id

            if (!snapshot.docs[0].data().good) {
              userRef.doc(id).update({
                good: 1,
              })
            } else {
              userRef.doc(id).update({
                good: snapshot.docs[0].data().good + 1,
              })
            }
            await firebase
              .firestore()
              .collection('tickets')
              .doc(this.$route.params.id)
              .update({
                bidderfinished: true,
              })
            alert('評価が完了しました')
            location.reload()
          })
      }
    },
    bad() {
      const userRef = firebase.firestore().collection('users')
      if (this.$auth.currentUser.uid == this.ticket.vipUID) {
        userRef
          .where('uid', '==', this.ticket.bidderUID)
          .get()
          .then(async (snapshot) => {
            let id = snapshot.docs[0].id
            if (!snapshot.docs[0].data().bad) {
              userRef.doc(id).update({
                bad: 1,
              })
            } else {
              userRef.doc(id).update({
                bad: snapshot.docs[0].data().bad + 1,
              })
            }
            await firebase
              .firestore()
              .collection('tickets')
              .doc(this.$route.params.id)
              .update({
                vipfinished: true,
              })
            alert('評価が完了しました')
            location.reload()
          })
      } else if (this.$auth.currentUser.uid == this.ticket.bidderUID) {
        userRef
          .where('uid', '==', this.ticket.vipUID)
          .get()
          .then(async (snapshot) => {
            let id = snapshot.docs[0].id
            if (!snapshot.docs[0].data().good) {
              userRef.doc(id).update({
                bad: 1,
              })
            } else {
              userRef.doc(id).update({
                bad: snapshot.docs[0].data().good + 1,
              })
            }
            await firebase
              .firestore()
              .collection('tickets')
              .doc(this.$route.params.id)
              .update({
                bidderfinished: true,
              })
            alert('評価が完了しました')
            location.reload()
          })
      }
    },
  },
  computed: {
    currentUser() {
      return this.$auth.currentUser
    },
  },
}
</script>
