<template>
  <v-app>
    <v-card width="600px" class="mx-auto mt-5">
      <div class="tag">
        <h1 class="white--text text-center">投稿</h1>
      </div>

      <v-card-text>
        <v-form>
          <!--タイトル-->
          <v-text-field label="タイトル" v-model="title" />
          <!--投稿者-->
          <v-text-field label="ユーザー名" v-model="createdBy" />
          <!--画像-->

          <input type="file" label="画像" v-on:change="onFileChanged" />
          <!--詳細内容-->
          <v-textarea label="詳細" solo v-model="description" />
          <!--値段-->
          <v-text-field label="金額" v-model="price" />
          <v-text-field
            prepend-icon="mdi-calendar"
            label="締め切り"
            v-model="deadLine"
            readonly
          />
          <v-date-picker
            v-model="deadLine"
            color="green lighten-1"
            header-color="primary"
          />
          <v-card-actions>
            <v-btn class="info" @click="post">投稿</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      title: '', //(VIPチケットの題名)
      description: '', //(詳しい説明)
      createdAt: '', //(投稿日時)
      createdBy: '', //投稿者名
      imageUrl: 'https://via.placeholder.com/800x600',
      price: '',
      deadLine: null, //締め切り日
    }
  },

  methods: {
    onFileChanged(e) {
      console.log(e)
      const imageUrl = e.target.files[0]
      if (imageUrl) {
        const fileRef = firebase.storage().ref().child(this.user.uid)
        fileRef
          .put(imageUrl)
          .then(() => {
            return fileRef.getDownloadURL()
          })
          .then((url) => {
            this.imageUrl = url
          })
      }
    },
    post() {
      // ログインしているか判定
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const ticket = {
            title: this.title,
            description: this.description,
            createdAt: new Date(),
            createdBy: this.createdBy,
            price: this.price,
            deadLine: this.deadLine,
            vipUID: firebase.auth().currentUser.uid,
            bidderUID: '',
            imageUrl: this.imageUrl,
            successfulBid: false,
          }
          await firebase
            .firestore()
            .collection('tickets')
            .add(ticket)
            .then(() => {
              this.$router.push('/')
            })
          alert('投稿が完了しました')
        } else {
          alert('ログインしてください')
        }
      })
    },
  },
}
</script>

<style scoped>
.tag {
  background-color: #64b5f6;
}
.info {
  font-weight: bold;
}
</style>
