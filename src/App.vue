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
        class="mx-2"
        color="blue"
        dark
        center
        fab
        fixed
        right
        @click="showCreateForm"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-dialog v-model="displayForm" max-width="500px">
        <new-post/>
      </v-dialog>
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
    displayForm: false
  }),

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
    showCreateForm() {
      this.displayForm = true
    }
  }
};
</script>
