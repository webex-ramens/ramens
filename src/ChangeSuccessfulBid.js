import firebase from 'firebase'

const func = function () {
  const ticketsRef = firebase.firestore().collection('tickets')
  // 落札されてないチケットの絞り込み
  const successfulBidsRef = ticketsRef.where('successfulBid', '==', false)
  // 締め切りを過ぎているチケットを落札済みに変更する処理
  successfulBidsRef.get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      if (doc.data().deadLine < date_str) {
        ticketsRef.doc(doc.id).update({
          successfulBid: true,
        })
      }
    })
  })
  // 下記は現在の日付を文字列でdate_strに入れる処理
  const date = new Date()
  const date_str = getStringFromDate(date)
  function getStringFromDate(date) {
    return (
      date.getFullYear().toString() +
      '-' +
      ('0' + (date.getMonth() + 1).toString()).slice(-2) +
      '-' +
      ('0' + date.getDate().toString()).slice(-2)
    )
  }
}

export default { func }
