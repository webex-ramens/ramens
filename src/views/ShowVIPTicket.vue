<template>
  <div class="VIPticket-item">
    <h2 class="VIPticket__title">{{ ticket.title }}</h2>
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
