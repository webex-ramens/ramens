<template>
  <v-app-bar>
    <div class="sign-in">
      <img src="../images/logo.png" class="logo" />
      <div class="bar">
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
            <router-link v-if="isVIP && isSignedIn" to="/post"
              >投稿</router-link
            >
          </span>
          <span>
            <router-link to="/editProfile">プロフィール</router-link>
          </span>
        </span>
      </div>
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
.logo {
  width: 170px;
  height: 60px;
  margin-top: 3px;
  margin-right: 450px;
  margin-left: 20px;
}
.bar {
  text-align: center;
  margin-top: 15px;
}
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
  display: flex;
}
a {
  text-decoration: none;
  color: #64b5f6;
}
</style>
