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
              <img class="vip-image" v-bind:src="ticket.photoURL" />
              <p class="vip-name">{{ ticket.name }}</p>
            </div>
            <h2 class="VIPticket__price">
              ￥{{ ticket.price }}<span>円</span>
            </h2>
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
      vips: [],
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
          // this.tickets.push({
          //   id: doc.id,
          //   ...doc.data(),
          firebase
            .firestore()
            .collection('users')
            .doc(doc.data().vipUID)
            .get()
            .then((vipsnapshot) => {
              this.tickets.push({
                id: doc.id,
                ...doc.data(),
                ...vipsnapshot.data(),
              })
            })
        })
        console.log(this.tickets)
      })
  },
}
</script>

<style scoped>
h1 {
  font-size: 60px;
  color: #64b5f6;
  margin-top: 40px;
  margin-bottom: 40px;
}
a {
  text-decoration: none;
  color: #000000;
}
.VIPticket-item:hover {
  opacity: 0.8;
}
.VIPticket-title {
  border-bottom: gray solid;
  margin: 2.5%;
  padding-bottom: 2.5%;
  color: #64b5f6;
}
.VIPticket-item {
  margin: 0 1% 2.5% 1%;
  width: 30%;
  padding: 1%;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 0 4px gray;
}
.VIPticket-item-top {
  position: relative;
}
.VIPticket__title {
  position: absolute;
  background-color: #757575;
  color: white;
  font-weight: bold;
  padding: 0.25%;
  border-radius: 10px;
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
  border: #bbdefb solid;
  border-radius: 30px;
}
.VIPticket-item__bottom {
  display: flex;
  justify-content: space-around;
  margin-top: 5%;
}
.VIPticket__price {
  font-weight: bold;
  font-size: 200%;
}
.VIPticket__price span {
  font-size: 50%;
}
.VIPticket__createdBy {
  width: 40%;
  display: flex;
  align-items: center;
}

.vip-image {
  border-radius: 100%;
  background-position: center bottom;
  width: 20%;
  margin-right: 20px;
}
</style>
