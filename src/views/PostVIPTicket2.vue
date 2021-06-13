<template>
  <v-app>
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

          <v-menu v-model="menu" max-width="290px" min-width="290px">
            <!-- ポップアップを追加する要素にv-on="on" -->
            <template v-slot:activator="{ on }">
              <v-text-field
                slot="activator"
                v-model="createdAt"
                label="投稿日"
                readonly
                v-on="on"
              />
            </template>
            <!-- ポップアップされる内容-->
            <v-date-picker v-model="createdAt" />
          </v-menu>

          <v-menu v-model="menu" max-width="290px" min-width="290px">
            <!-- ポップアップを追加する要素にv-on="on" -->
            <template v-slot:activator="{ on }">
              <v-text-field
                slot="activator"
                v-model="deadLine"
                label="締切日"
                readonly
                v-on="on"
              />
            </template>
            <!-- ポップアップされる内容-->
            <v-date-picker v-model="deadLine" />
          </v-menu>
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
  name: 'PostVIPTicket2',
  data() {
    return {
      title: '', //(VIPチケットの題名)
      description: '', //(詳しい説明)
      createdAt: '', //(投稿日時)
      createdBy: '', //投稿者名
      imageUrl: '',
      price: '',
      deadLine: '', //締め切り日
    }
  },

  methods: {
    post() {
      /* 変更点 */
      const tweet = {
        tilte: this.title,
        description: this.description,
        createdAt: this.createdAt,
        createdBy: this.createdBy,
        imageUrl: this.imageUrl,
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
