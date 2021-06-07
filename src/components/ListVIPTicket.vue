<template>
  <div class="VIPticket-list">
    <div class="VIPticket-item" v-for="ticket in tickets" :key="ticket.id">
      <h2 class="VIPticket-title">{{ ticket.title }}</h2>
      <span class="VIPticket__createdBy">{{ ticket.createdBy }}</span>
      <div class="VIPticket__image">
        <img v-vind:src="ticket.imageUrl" />
      </div>
      <div class="VIPticket__description">{{ ticket.description }}</div>
      <div class="VIPticket__createdAt">{{ ticket.createdAt }}</div>
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
</style>
