<template>
  <v-app>
    <v-card width="600px" class="mx-auto mt-5">
      <div class="tag">
        <h1 class="white--text text-center">プロフィール</h1>
      </div>
      <v-card-text>
        <v-form>
          <!--画像-->
          <img class="circle" v-bind:src="photoURL" />
          <br />
          <label class="upload-img-btn">
            画像の変更
            <input
              type="file"
              label="プロフィール画像"
              v-on:change="onFileChanged"
              class="file"
              style="display: none"
            />
          </label>

          <!--名前-->
          <v-text-field label="名前" v-model="name" />

          <!--詳細内容-->
          <v-textarea label="内容" solo v-model="profile" />
          <v-switch
            v-model="isVIP"
            flat
            :label="`VIP: ${isVIP.toString()}`"
          ></v-switch>

          <v-card-actions>
            <v-btn class="info" @click="post">完了</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'EditProfile',
  data() {
    return {
      name: '', //(VIPチケットの題名)
      photoURL: '',
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
          uid: this.uid,
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

<style scoped>
.file {
  text-align: left;
}
h1 {
  text-align: center;
}
.circle {
  width: 180px;
  height: 180px;
  border-radius: 100%;
  background-size: 200px 200px;
  background-position: center bottom;
  margin-left: auto;
  margin-right: auto;
}
.upload-img-btn {
  margin: 22px auto;
  padding: 8px;
  border-radius: 4px;
  max-width: 120px;
  text-align: center;
  display: block;
  background-color: #f1f1f1;
  color: #73a9ff;
  box-shadow: 0 2px 6px rgba(146, 146, 146, 0.8);
  cursor: pointer;
  font-weight: bold;
}
.tag {
  background-color: #64b5f6;
}
.info {
  font-weight: bold;
}
</style>
