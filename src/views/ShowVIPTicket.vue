<template>
  <div class="VIPticket-item">
    <h1 class="VIPticket__successfulBid" v-if="ticket.successfulBid">
      このオークションは落札済みです
    </h1>
    <h1 class="VIPticket__title">{{ ticket.title }}</h1>
    <div class="VIPticket-middle">
      <img class="VIPticket__image" v-bind:src="ticket.imageUrl" />
      <h4 class="VIPticket__description">{{ ticket.description }}</h4>
    </div>
    <div class="VIPticket-bottom">
      <router-link
        :to="{ name: 'InfluencerProfile', params: { id: ticket.vipUID } }"
        class="VIPticket__createdBy"
        >{{ ticket.createdBy }}</router-link
      >
      <div class="VIPticket__deadLine">締切:{{ ticket.deadLine }}</div>
      <BuyVIPTicket />
    </div>
    <router-link
      :to="{ name: 'AfterSuccessfulBid', params: { id: ticket.id } }"
      v-if="ticket.successfulBid && seen"
      class="VIPticket__afterSuccessfulBid"
    >
      落札後の画面へ
    </router-link>
    <!-- <div class="VIPticket__createdAt">
      投稿日:{{ ticket.createdAt.toDate() }}
    </div> -->
    <!-- <div class="VIPticket__price">￥{{ ticket.price }}円</div> -->
  </div>
</template>

<script>
import firebase from 'firebase'
import BuyVIPTicket from '@/components/BuyVIPTicket.vue'

export default {
  components: {
    BuyVIPTicket,
  },
  data() {
    return {
      ticket: {},
      seen: false,
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
        // ”ログインユーザー==落札者”または”ログインユーザー==出品者かどうか”
        if (
          firebase.auth().currentUser.uid == snapshot.data().bidderUID ||
          firebase.auth().currentUser.uid == snapshot.data().vipUID
        ) {
          // 落札後ボタンを見えるようにするためにseenをtrueに変更
          this.seen = true
        }
      })
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: #000000;
}
.VIPticket__createdBy:hover {
  opacity: 0.5;
}
.VIPticket__successfulBid {
  color: red;
  margin-top: -2%;
}
.VIPticket__afterSuccessfulBid {
  background-color: #64b5f6;
  color: white;
  padding: 1%;
  font-size: 200%;
  font-weight: bold;
  border-radius: 10px;
  margin: 0 10% 3% 10%;
}
.VIPticket__afterSuccessfulBid:hover {
  opacity: 0.8;
}
.VIPticket__title {
  background-color: #64b5f6;
  margin: 0 5% 3% 5%;
  color: white;
}
.VIPticket-item {
  background-color: white;
  border-radius: 30px;
  margin: 1% 10% 0% 10%;
  padding-top: 2%;
  display: flex;
  flex-direction: column;
}
.VIPticket-middle {
  display: flex;
  margin: 0 5% 3% 5%;
  align-items: center;
}
.VIPticket__description {
  margin-left: 5%;
  margin-right: 3%;
  text-align: left;
  line-height: 200%;
}
.VIPticket__image {
  width: 50%;
  object-fit: contain;
}
.VIPticket-bottom {
  display: flex;
  justify-content: space-between;
  margin: 0 5% 3% 5%;
  align-items: center;
}
.VIPticket__createdBy {
  width: 20%;
}
.VIPticket__deadline {
  width: 25%;
}
</style>
