<template>
  <div class="app">
    <button v-on:click="postTweet">ツイート</button>
    <div v-for="tweet in tweets" :key="tweet.id">
      {{ tweet.title }}
      {{ tweet.description }}
      {{ tweet.createdAt }}
      {{ tweet.imageUrl }}
      {{ tweet.price }}
      {{ tweet.deadLine }}
      <
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'PostVIPTicket',
  data() {
    return {
      tweets: {
        title: [], //(VIPチケットの題名)
        description: [], //(詳しい説明)
        createdAt: [], //(投稿日時)
        createdBy: [], //投稿者名
        imageUrl: [],
        price: [],
        deadLine: [], //締め切り日
      },
    }
  },
  methods: {
    postTweet() {
      /* 変更点 */
      const tweet = {
        tilte: 'モーニングコール',
        description: '朝に電話をかける',
        createdAt: '6/12',
        createdBy: '岩口',
        imageUrl: '',
        price: '1円',
        deadLine: '6/13',
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
