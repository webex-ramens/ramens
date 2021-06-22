<template>
  <div class="Influencer-list">
    <div class="Influencer-item" v-for="user in users" :key="user.id">
      <router-link
        :to="{ name: 'Influencer_profile', params: { id: user.id } }"
      >
        <h2>{{ user.name }}</h2>
        <img class="Influencer_image" v-bind:src="user.PhotoURL" />
        <div>{{ user.isVIP }}</div>
        <div>{{ user.profile }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'ListVIPProfile',
  data() {
    return {
      users: [],
    }
  },
  created() {
    firebase
      .firestore()
      .collection('users')
      .where('isVIP', '==', true)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.users.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
  },
}
</script>

<style scoped>
.Influencer-item {
  border: solid;
  margin: 0 5% 5% 5%;
  width: 20%;
}
.Influencer-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
}
.Influencer_image {
  width: 100%;
  object-fit: contain;
}
</style>
