<template>
  <div class="VIPticket-item">
    <h2 class="VIPticket-title">{{ ticket.title }}</h2>
    <div class="VIPticket__createdBy">{{ ticket.createdBy }}</div>
    <img class="VIPticket__image" v-bind:src="ticket.imageUrl" />
    <div class="VIPticket__description">{{ ticket.description }}</div>
    <div class="VIPticket__createdAt">{{ ticket.createdAt }}</div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
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
        if (snapshot.exists) {
          console.log('Document data:', snapshot.data())
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
        this.ticket = {
          id: snapshot.id,
          ...snapshot.data(),
        }
      })
  },
}
</script>

<style scoped>
.VIPticket-item {
  border: solid;
  text-align: center;
  margin: 0 25%;
}
.VIPticket__image {
  width: 100%;
  object-fit: contain;
}
</style>
