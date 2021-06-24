<template>
  <div>
    <div v-if="logs">
      <div v-for="log in logs" :key="log.timestamp">
        <div>名前:{{ log.name }}</div>
        <div>発言:{{ log.content }}</div>
      </div>
    </div>
    <div>
      <div>
        <input type="text" v-model="content" />
        <button v-on:click="post">発言</button>
      </div>
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
        const { name, content, timestamp } = doc.data()
        logs.push({ name, content, timestamp: timestamp })
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
