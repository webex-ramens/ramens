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
        <input
          type="file"
          label="プロフィール画像"
          v-on:change="onFileChanged"
        />
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
    onFileChanged(e) {
      console.log(e)
      const imageFile = e.target.files[0]
      if (imageFile) {
        const fileRef = firebase.storage().ref().child(this.user.uid)
        fileRef
          .put(imageFile)
          .then(() => {
            return fileRef.getDownloadURL()
          })
          .then((url) => {
            this.photoURL = url
          })
      }
    },
    post() {
      if (this.user.uid) {
        const user = {
          name: this.name, //(VIPチケットの題名)
          photoURL: this.photoURL,
          profile: this.profile,
          isVIP: this.isVIP, //締め切り日
        }
        firebase
          .firestore()
          .collection('users')
          .doc(this.user.uid)
          .set(user)
          .then(() => {
            this.$router.push('/')
          })
      }
    },
  },
  created() {
    const subscription = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            console.log(snapshot)
            return snapshot.data()
          })
          .then((data) => {
            this.name = data.name
            this.photoURL = data.photoURL
            this.profile = data.profile
            this.isVIP = data.isVIP
          })
      }
    })
    subscription()
  },
  computed: {
    user() {
      return this.$auth.currentUser
    },
    uid() {
      return this.$auth.currentUser.uid
    },
  },
}
</script>
