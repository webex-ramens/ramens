<template>
  <div class="card">
    <div class="commit" v-if="logs">
      <div v-for="log in logs" :key="log.timestamp">
        <div v-if="log.uid == user.uid" class="message my-message">
          <div class="talk_my">{{ log.content }}</div>
          <img class="photo" v-bind:src="log.photoURL" />
          <div class="name">{{ log.name }}</div>
        </div>

        <div v-else class="message other-message">
          <img class="photo" v-bind:src="log.photoURL" />
          <div class="talk_other">{{ log.content }}</div>
          <div class="name">{{ log.name }}</div>
        </div>
      </div>
    </div>

    <v-footer class="bar">
      <input style="height: 50px" class="input" type="text" v-model="content" />
      <v-btn class="send" @click="post" text x-large right>
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-footer>
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
.talk_my {
  display: inline-block;
  position: relative;
  margin: 5px 0 0 105px;
  padding: 17px 13px;
  border-radius: 12px;
  background: #bbdefb;
  margin-right: 10px;
  margin-top: -20px;
  color: black;
}
.talk_other {
  display: inline-block;
  position: relative;
  padding: 17px 13px;
  border-radius: 12px;
  background: #bbdefb;
  margin-left: 10px;
  margin-top: -20px;
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
  width: 500px;
  box-shadow: 0 0 4px gray;
  margin: auto;
}
.my-message {
  text-align: right;
}
.other-message {
  text-align: left;
}
.name {
  margin-top: -20px;
}
.message {
  margin-bottom: 30px;
  justify-content: center;
  align-items: center;
}
input {
  color: black;
  background: white;
  border-color: black;
  border: none;
  outline: none;
  width: 80%;
}
.send {
  color: white;
  background-color: #bbdefb;
  margin-left: 46px;
}
.bar {
  display: flex;
  flex-wrap: unset;
  justify-content: space-between;
}
</style>
