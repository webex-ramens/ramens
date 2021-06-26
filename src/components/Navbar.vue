<template>
  <v-app-bar>
    <div class="sign-in">
      <div class="logo">
        <img src="../images/logo.png" />
      </div>
      <span>
        <router-link to="/">オークション</router-link>
      </span>
      <span>
        <router-link to="/listVIPProfile">インフルエンサー</router-link>
      </span>

      <span v-if="!isSignedIn" @click="signIn()">サインイン</span>
      <span v-else @click="signOut">サインアウト</span>

      <span v-if="isSignedIn">
        <span>
          <router-link v-if="isVIP && isSignedIn" to="/post">投稿</router-link>
        </span>
        <span>
          <router-link to="/editProfile">プロフィール</router-link>
        </span>
      </span>
    </div>
  </v-app-bar>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return { currentUser: {} }
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
    isVIP() {
      return this.$auth.currentUser.isVIP
    },
  },
}
</script>

<style scoped>
.sign-in span {
  font-weight: bold;
  color: #0a4091;
  padding: 0 1rem;
  font-size: 20px;
  color: #64b5f6;
}
.sign-in span:hover {
  color: #a332ad2b;
}

.sign-in {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 20px;
}
a {
  text-decoration: none;
  color: #64b5f6;
}
</style>
