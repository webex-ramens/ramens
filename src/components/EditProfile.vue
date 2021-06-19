<template>
  <v-card width="600px" class="mx-auto mt-5">
    <v-card-title>
      <h1>プロフィール</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <!--タイトル-->
        <v-text-field label="名前" v-model="name" />
        <!--画像-->
        <v-file-input label="プロフィール画像" v-model="photoURL" />
        <!--詳細内容-->
        <v-textarea label="内容" solo v-model="profile" />
        <v-switch
          v-model="isVIP"
          flat
          :label="`VIP: ${isVIP.toString()}`"
        ></v-switch>

        <v-card-actions>
          <v-btn class="info" @click="post">編集完了</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'EditProfile',
  data() {
    return {
      name: '', //(VIPチケットの題名)
      photoURL: 'https://via.placeholder.com/800x600',
      profile: '',
      isVIP: true,
    }
  },

  methods: {
    post() {
      // ログインしているか判定
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const user = {
            name: this.name, //(VIPチケットの題名)
            photoURL: '',
            profile: this.profile,
            isVIP: this.isVIP, //締め切り日
          }
          await firebase.firestore().collection('users').add(user)
          alert('プロフィールが完了しました')
        } else {
          alert('ログインしてください')
        }
      })
    },
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
