<template>
  <div class="Influencer-item">
    <h2>{{ user.name }}</h2>
    <img class="photo" v-bind:src="user.PhotoURL" />
    <div>{{ user.isVIP }}</div>
    <div>{{ user.profile }}</div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Influencer_profile',
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

<style scoped>
.Influencer-item {
  border: solid;
  text-align: center;
  margin: 0 25%;
}
.photo {
  width: 100%;
  object-fit: contain;
}
</style>
