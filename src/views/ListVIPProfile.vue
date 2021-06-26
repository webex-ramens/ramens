<template>
  <div class="Influencer">
    <h1>インフルエンサー</h1>
    <div class="Influencer-list">
      <div class="Influencer-item" v-for="user in users" :key="user.id">
        <router-link
          :to="{ name: 'InfluencerProfile', params: { id: user.id } }"
        >
          <div class="name">
            <img class="Influencer_image" v-bind:src="user.photoURL" />
            <h2>{{ user.name }}</h2>
          </div>
          <hr />
          <!-- <div>{{ user.isVIP }}</div> -->
          <div class="pro">{{ user.profile }}</div>
        </router-link>
      </div>
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
  margin: 0 3% 2.5% 3%;
  width: 20%;
  padding: 1%;
  background-color: white;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 0 4px gray;
}
.Influencer-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
}
.Influencer_image {
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-size: 200px 200px;
  background-position: center bottom;
  margin-left: auto;
  margin-right: auto;
}

a {
  text-decoration: none;
}
h1 {
  font-size: 40px;
  color: #64b5f6;
  margin-top: 40px;
  margin-bottom: 40px;
}
h2 {
  color: black;
}
hr {
  height: 2px;
  background-color: #64b5f6;
  border: none;
}
.pro {
  color: black;
}
</style>
