<template>
  <v-app-bar>
    <div class="sign-in">
      <span>
        <router-link to="/">オークション</router-link>
      </span>
      <span>
        <router-link to="/listVIPProfile">インフルエンサー</router-link>
      </span>

      <span v-if="!isSignedIn" @click="signIn()">サインイン</span>
      <span v-else @click="signOut">サインアウト</span>

      <span v-if="isSignedIn">
        <router-link to="/post">投稿</router-link>
        <router-link to="/editProfile">プロフィール編集</router-link>
      </span>
      <span v-else>
        <router-link to="//Profile">プロフィール</router-link>
      </span>
    </div>
  </v-app-bar>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {}
  },

  methods: {
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    signOut() {
      firebase.auth().signOut()
    },
  },
  computed: {
    isSignedIn() {
      return this.$auth.currentUser.uid
    },
  },
}
</script>

<style scoped>
.sign-in span {
  font-weight: bold;
  color: #0a4091;
  padding: 0 1rem;
}
.sign-in span:hover {
  color: #a332ad2b;
}

.sign-in {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
