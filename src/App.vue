<template>
  <v-app>
    <v-app-bar
      app
      color="light-green darken-2"
      dark
    >
      <v-toolbar-title>CookHub</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        @click="login"
        text
      >
        <span class="mr-2">login</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main app>
      <v-btn
        class="mx-2 post-btn"
        color="blue"
        dark
        center
        fab
        fixed
        right
        v-if="uid !== ''"
        @click="displayForm = true"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <new-post
        :displayForm="displayForm"
        @close-dialog="displayForm = false"
        @postNewImage="postNewImage"
      />

      <v-card
        v-for="param in dataList" :key="param.id"
        max-width="374"
        class="mx-auto my-12"
      >
        <v-img
          :src="param.uploadImageUrl"
          height="250"
          contain
        ></v-img>
        <v-card-text>
          {{ param.remarks }}
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "./firebase";
import newPost from "./components/newPost";

export default {
  name: "App",

  components: {
    "new-post": newPost
  },

  data: () => ({
    uid: "",
    username: "",
    displayForm: false,
    dataList: []
  }),

  mounted() {
    const db = firebase.firestore();
    db.collection("images").get()
      .then((querySnapshot) => {
        this.dataList.length = 0;
        querySnapshot.forEach(doc => {
          const data = doc.data();
          this.dataList.push({
            id: doc.id,
            ...data
          });
        });
      });
  },

  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then(result => {
          const user = result.user;
          if(user) {
            this.uid = user.uid;
          }
        }).catch(error => {
          console.error(error);
        });
    },
    postNewImage(param) {
      const filename = param.inputImage.name
      const db = firebase.firestore();
      db.collection("images").doc(filename).set({
        uploadImageUrl: param.uploadImageUrl,
        remarks: param.remarks
      }).then(() => {this.displayForm = false});
    }
  }
};
</script>

<style scoped>
.post-btn {
  margin-top: 16px;
  margin-right: 16px;
}
v-card {
  width: 250px;
}
</style>