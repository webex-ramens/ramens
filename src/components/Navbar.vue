<template>
  <v-app-bar>
    <div class="sign-in">
      <span>
        <router-link to="/">オークション</router-link>
      </span>
      <span>
        <router-link to="/listVIPProfile">インフルエンサー</router-link>
      </span>

      <span
        @click="
          signIn()
          profile()
        "
        >サインイン</span
      >
      <span @click="signOut">サインアウト</span>

      <span v-if="seen == true">
        <router-link to="/editProfile">投稿</router-link>
        <router-link to="/post">プロフィール編集</router-link>
      </span>
      <span v-else>
        <router-link to="/post">プロフィール</router-link>
      </span>
    </div>
  </v-app-bar>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      seen: 'false',
    }
  },

  methods: {
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    signOut() {
      firebase.auth().signOut()(async (user) => {
        this.$router.push('/BeforeSignIn')
        if (user) {
          this.seen = 'false'
        }
      })
    },

    profile() {
      this.seen = 'ture'
    },
    out() {
      this.seen = 'false'
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
