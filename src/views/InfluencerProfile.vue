<template>
  <v-app class="card">
    <div class="Influencer-item">
      <div class="contents">
        <img class="photo" v-bind:src="user.photoURL" />
        <h2 class="name">{{ user.name }}</h2>
      </div>
      <div class="value">
        <div class="good">
          <v-btn class="blue lighten-2" text icon x-large color="white">
            <v-icon>mdi-thumb-up</v-icon>
          </v-btn>
          {{ user.good }}
        </div>
        <div class="bad">
          <v-btn class="red lighten-2" text icon x-large color="white">
            <v-icon>mdi-thumb-down</v-icon>
          </v-btn>
          {{ user.bad }}
        </div>
      </div>
      <hr />
      <!-- <div>{{ user.isVIP }}</div> -->
      <div class="profile">{{ user.profile }}</div>
    </div>
  </v-app>
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
  text-align: center;
  margin: 0 25%;
  box-shadow: 0 0 4px gray;
  margin: 0 3% 2.5% 3%;
  background-color: white;
}
.photo {
  width: 150px;
  height: 150px;
  border-radius: 100%;
  background-size: 200px 200px;
  background-position: center bottom;
  margin-left: 0px;
  margin-right: 100px;
  margin-top: 20px;
}
.contents {
  display: flex;
  justify-content: left; /* 水平方向 */
  align-items: left; /* 垂直方向 */
  margin-left: 200px;
  margin-top: 30px;
  position: relative;
}
.name {
  font-size: 60px;
  margin-top: 50px;
}
hr {
  height: 6px;
  width: 80%;
  text-align: center;
  background-color: #64b5f6;
  border: none;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
}
.profile {
  font-size: 30px;
  height: 300px;
}
.card {
  margin-top: 30px;
}
.value {
  display: flex;
  margin-top: 20px;
  margin-top: -100px;
}
.good {
  margin-left: 900px;
  margin-right: 40px;
  margin-bottom: 30px;
}
</style>
