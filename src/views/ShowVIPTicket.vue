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
        ><img class="vip-image" v-bind:src="vip.photoURL" />
        <p class="vip-name">{{ vip.name }}</p></router-link
      >
      <div class="VIPticket__deadLine">{{ deadLine }}</div>
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
      vip: {},
      deadLine: '',
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

        firebase
          .firestore()
          .collection('users')
          .doc(snapshot.data().vipUID)
          .get()
          .then((vipsnapshot) => {
            this.vip = {
              id: vipsnapshot.id,
              ...vipsnapshot.data(),
            }
          })
        // 以下締め切りまでの残り時間を計算する処理
        const date1 = new Date(snapshot.data().deadLine + 'T24:00:00')
        const date2 = new Date()
        const diff = date1.getTime() - date2.getTime()
        const hour = diff / (60 * 60 * 1000)
        const minute = (hour - Math.floor(hour)) * 60
        // console.log(Math.floor(hour))
        // console.log(Math.floor(minute))
        this.deadLine =
          '残り' + Math.floor(hour) + '時間' + Math.floor(minute) + '分'
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
  font-size: 300%;
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
  font-size: 150%;
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
  display: flex;
  align-items: center;
}

.VIPticket__deadLine {
  width: 25%;
  color: #64b5f6;
  font-weight: bold;
  font-size: 200%;
}
.vip-image {
  /* width: 180px; */
  /* height: 180px; */
  border-radius: 100%;
  /* background-size: 200px 200px; */
  background-position: center bottom;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
}
.vip-name {
  font-weight: bold;
}
</style>
