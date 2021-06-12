<template>
  <div class="VIPticket-list">
    <div class="VIPticket-item" v-for="ticket in tickets" :key="ticket.id">
      <router-link :to="{ name: 'ShowVIPTicket', params: { id: ticket.id } }">
        <h2 class="VIPticket__title">{{ ticket.title }}</h2>
        <div class="VIPticket__createdBy">{{ ticket.createdBy }}</div>
        <img class="VIPticket__image" v-bind:src="ticket.imageUrl" />
        <div class="VIPticket__description">{{ ticket.description }}</div>
        <div class="VIPticket__createdAt">{{ ticket.createdAt }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      tickets: [],
    }
  },
  created() {
    firebase
      .firestore()
      .collection('tickets')
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.tickets.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
  },
}
</script>

<style scoped>
.VIPticket-item {
  border: solid;
  margin: 0 5% 5% 5%;
  width: 20%;
}
.VIPticket-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
}
.VIPticket__image {
  width: 100%;
  object-fit: contain;
}
</style>
