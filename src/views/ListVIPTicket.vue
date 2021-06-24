<template>
  <div>
    <h1 class="VIPticket-title">オークション</h1>
    <div class="VIPticket-list">
      <div class="VIPticket-item" v-for="ticket in tickets" :key="ticket.id">
        <router-link :to="{ name: 'ShowVIPTicket', params: { id: ticket.id } }">
          <div class="VIPticket-item__top">
            <p class="VIPticket__title">{{ ticket.title }}</p>
            <img class="VIPticket__image" v-bind:src="ticket.imageUrl" />
          </div>
          <!-- <div class="VIPticket__createdAt">
            投稿日:{{ ticket.createdAt.toDate() }}
          </div> -->
          <!-- <div class="VIPticket__deadLine">締切:{{ ticket.deadLine }}</div> -->
          <div class="VIPticket-item__bottom">
            <div class="VIPticket__createdBy">
              <!-- <img class="" v-bind:src="" /> -->
              {{ ticket.createdBy }}
            </div>
            <h2 class="VIPticket__price">￥{{ ticket.price }}円</h2>
          </div>
        </router-link>
      </div>
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
  computed: {
    user() {
      return this.$auth.currentUser
    },
  },
  created() {
    firebase
      .firestore()
      .collection('tickets')
      .orderBy('createdAt')
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
a {
  text-decoration: none;
  color: #000000;
}
.VIPticket-item:hover {
  opacity: 0.8;
}
.VIPticket-title {
  border-bottom: solid;
  margin: 2.5%;
  padding-bottom: 2.5%;
}
.VIPticket-item {
  margin: 0 3% 2.5% 3%;
  width: 20%;
  padding: 1%;
  background-color: #f2f2f2;
  border-radius: 10px;
}
.VIPticket-item-top {
  position: relative;
}
.VIPticket__title {
  position: absolute;
  background-color: black;
  color: white;
  padding: 0.25%;
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
.VIPticket-item__bottom {
  display: flex;
  justify-content: space-around;
  margin-top: 5%;
}
.VIPticket__price {
  font-weight: bold;
}
</style>
