<template>
  <div class="header">
    <v-app-bar>
      <div class="sign-in">
        <img src="../images/logo.png" class="logo" />
      </div>
    </v-app-bar>
    <div class="bar">
      <span>
        <router-link to="/">オークション</router-link>
      </span>
      <span>
        <router-link to="/listVIPProfile">インフルエンサー</router-link>
      </span>

      <span v-if="isSignedIn">
        <span>
          <router-link v-if="isVIP && isSignedIn" to="/post"
            >出品する</router-link
          >
        </span>
        <span>
          <router-link to="/editProfile">プロフィール</router-link>
        </span>
      </span>

      <span v-if="!isSignedIn" @click="signIn()">サインイン</span>
      <span v-else @click="signOut">サインアウト</span>
    </div>
  </div>
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
.logo {
  height: 64px;
  width: auto;
}
.bar {
  display: flex;
  justify-content: center;
  font-weight: bold;
  /* color: #64b5f6; */
  margin-top: 0.1%;
}

.bar span {
  font-weight: bold;
  padding: 0 1rem;
  color: #551a8b;
}
.bar span:hover {
  /* color: #a332ad2b; */
  opacity: 0.8;
}

.sign-in {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 64px;
}
a {
  text-decoration: none;
  /* color: #64b5f6; */
}
</style>
