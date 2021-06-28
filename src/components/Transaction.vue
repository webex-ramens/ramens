<template>
  <div class="app">
    <div
      class="thank"
      v-if="ticket.vipfinished && ticket.vipUID == currentUser.uid"
    >
      ありがとうございました。
    </div>
    <div
      class="thank"
      v-else-if="ticket.bidderfinished && ticket.bidderUID == currentUser.uid"
    >
      ありがとうございました。
    </div>

    <div v-else-if="ticket.bidderDone && ticket.vipDone">
      <div class="thank">
        <p>評価してください</p>
      </div>

      <v-app>
        <div class="value">
          <div class="good">
            <v-btn
              class="blue lighten-2"
              @click="good"
              text
              icon
              x-large
              color="white"
            >
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
          </div>

          <div class="bad">
            <v-btn
              @click="bad"
              class="red lighten-2"
              text
              icon
              x-large
              color="white"
            >
              <v-icon>mdi-thumb-down</v-icon>
            </v-btn>
          </div>
        </div>
      </v-app>
    </div>

    <div
      class="thank"
      v-else-if="currentUser.uid == ticket.bidderUID && ticket.bidderDone"
    >
      インフルエンサーの取引が完了したら評価をつけることができます
    </div>
    <div
      class="thank"
      v-else-if="currentUser.uid == ticket.vipUID && ticket.vipDone"
    >
      購入者の取引が完了したら評価をつけることができます
    </div>
    <button @click="transactionDone" v-else class="thank">取引完了</button>
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
        alert('取引が完了しました')
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

<style scoped>
.app {
  text-align: center;
  margin-top: 30px;
}
.thank {
  color: #64b5f6;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
}
.value {
  display: flex;
  margin-top: 10px;
  justify-content: center;
}
.good {
}
</style>
