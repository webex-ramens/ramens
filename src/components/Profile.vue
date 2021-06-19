<template>
  <v-card width="600px" height="400px" align="center">
    <v-card-title>
      <h1>{{ user.name }}</h1>
    </v-card-title>
    <v-card-text>
      <img class="photo" v-bind:src="user.PhotoURL" />
      <div>{{ user.isVIP }}</div>
      <div>{{ user.profile }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Profile',
  data() {
    return {
      user: {},
    }
  },
  created() {
    firebase
      .firestore()
      .collection('users')
      .doc(this.$route.params.id)
      .get()
      .then((snapshot) => {
        this.user = {
          id: snapshot.id,
          ...snapshot.data(),
        }
      })
  },
}
</script>
