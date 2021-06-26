<template>
  <div class="VIPticket-item">
    <h1 class="VIPticket__successfulBid" v-if="ticket.successfulBid">
      落札済みです
    </h1>
    <h2 class="VIPticket__title">{{ ticket.title }}</h2>
    <router-link
      :to="{ name: 'InfluencerProfile', params: { id: ticket.vipUID } }"
      class="VIPticket__createdBy"
      >{{ ticket.createdBy }}</router-link
    >
    <img class="VIPticket__image" v-bind:src="ticket.imageUrl" />
    <div class="VIPticket__description">詳細:{{ ticket.description }}</div>
    <div class="VIPticket__createdAt">
      投稿日:{{ ticket.createdAt.toDate() }}
    </div>
    <div class="VIPticket__deadLine">
      締切:{{ ticket.deadLine }} 23:59:59まで
    </div>
    <div class="VIPticket__price">現在価格:{{ ticket.price }}</div>
    <BuyVIPTicket />
    <router-link
      :to="{ name: 'AfterSuccessfulBid', params: { id: ticket.id } }"
      v-if="ticket.successfulBid && seen"
      class="VIPticket__afterSuccessfulBid"
    >
      落札後の画面へ
    </router-link>
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
.VIPticket__successfulBid {
  color: red;
}
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
