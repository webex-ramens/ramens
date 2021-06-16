<template>
  <v-card width="600px" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">投稿</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <!--タイトル-->
        <v-text-field label="タイトル" v-model="title" />
        <!--投稿者-->
        <v-text-field label="username" v-model="createdBy" />
        <!--画像-->
        <v-file-input label="picutere" v-model="imageUrl" />
        <!--詳細内容-->
        <v-textarea label="詳細" solo v-model="description" />
        <!--値段-->
        <v-text-field label="金額" v-model="price" />
        <v-text-field
          prepend-icon="mdi-calendar"
          label="締め切り日"
          v-model="deadLine"
          readonly
        />
        <v-date-picker v-model="deadLine" />
        <v-card-actions>
          <v-btn class="info" @click="post">投稿</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'PostVIPTicket2',
  data() {
    return {
      title: '', //(VIPチケットの題名)
      description: '', //(詳しい説明)
      createdAt: '', //(投稿日時)
      createdBy: '', //投稿者名
      imageUrl: '',
      price: '',
      deadLine: null, //締め切り日
    }
  },

  methods: {
    post() {
      /* 変更点 */
      const tweet = {
        tilte: this.title,
        description: this.description,
        createdAt: new Date(),
        createdBy: this.createdBy,
        price: this.price,
        deadLine: this.deadLine,
      }
      firebase
        .firestore()
        .collection('tweets')
        .add(tweet)
        .then((ref) => {
          this.tweets.push({
            id: ref.id,
            ...tweet,
          })
        })
    },
  },
}
</script>
