<template>
  <div class="card">
    <div v-if="logs">
      <div v-for="log in logs" :key="log.timestamp">
        <div v-bind:class="log.uid == user.uid ? myMessage : otherMessage">
          <img class="photo" v-bind:src="log.photoURL" />
          <div class="talk01">{{ log.content }}</div>
          <div>{{ log.name }}</div>
        </div>
      </div>
    </div>

    <div>
      <input class="input" type="text" v-model="content" />
      <button v-on:click="post">送信</button>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Chat',
  data() {
    return {
      logs: [],
      unsubscribe: null,
      content: '',
      myMessage: 'my-message',
      otherMessage: 'other-message',
    }
  },
  computed: {
    user() {
      return this.$auth.currentUser
    },
  },
  methods: {
    post() {
      if (this.content && this.$auth.currentUser.uid) {
        firebase
          .firestore()
          .collection('tickets')
          .doc(this.$route.params.id)
          .collection('chat')
          .add({
            content: this.content,
            name: this.$auth.currentUser.name,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            uid: this.$auth.currentUser.uid,
            photoURL: this.$auth.currentUser.photoURL,
          })
      }
    },
  },
  created() {
    const ref = firebase
      .firestore()
      .collection('tickets')
      .doc(this.$route.params.id)
      .collection('chat')
      .orderBy('timestamp')
    this.unsubscribe = ref.onSnapshot((snapshot) => {
      let logs = []
      snapshot.forEach((doc) => {
        const { name, content, timestamp, photoURL, uid } = doc.data()
        logs.push({
          name,
          content,
          photoURL,
          uid,
          timestamp: timestamp.toMillis(),
        })
      })
      this.logs = logs
    })
  },
  destroyed() {
    if (this.unsubscribe) {
      this.unsubscribe()
      this.unsubscribe = null
    }
  },
}
</script>

<style scoped>
header {
  position: fixed;
  width: 100%;
  background: #00d1b2;
  z-index: 2;
  height: 55px;
}
.balloon01 {
  width: 100%;
  margin: 1.5em 0;
  overflow: hidde;
}
.talk01 {
  display: inline-block;
  position: relative;
  margin: 5px 0 0 105px;
  padding: 17px 13px;
  border-radius: 12px;
  background: #bbdefb;
}
.item {
  margin: 0 3% 2.5% 3%;
  width: 20%;
  padding: 1%;
  background-color: white;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 0 4px gray;
}
.list {
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
}
.photo {
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-size: 200px 200px;
  background-position: center bottom;
  margin-left: auto;
  margin-right: auto;
}
.card {
  padding: 1%;
  background-color: white;
  border-radius: 10px;
  width: 850px;
  box-shadow: 0 0 4px gray;
  margin-left: 300px;
}
.my-message {
  background-color: red;
}
</style>
