<template>
  <div id="app">
    <div id="nav">
      <router-link to="/BeforeSignIn"></router-link>
      <router-link to="/AfterSignIn"></router-link>
    </div>
    <v-app-bar>
      <div class="sign-in">
        <span @click="signIn">サインイン</span>
        <span @click="signOut">サインアウト</span>
      </div>
    </v-app-bar>
    <router-view />
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  methods: {
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    signOut() {
      firebase.auth().signOut()
      this.$router.push('/BeforeSignIn')
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 1rem;
}
#nav a:hover {
  color: #2c3e502b;
}
.sign-in span {
  font-weight: bold;
  color: #0a4091;
  padding: 0 1rem;
}
.sign-in span:hover {
  color: #a332ad2b;
}
#nav a.router-link-exact-active {
  color: #42b983;
}

.sign-in {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
