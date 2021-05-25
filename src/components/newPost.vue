<template>
  <v-dialog v-model="displayForm" max-width="500px" persistent>
    <v-card>
      <v-container>
        <v-file-input
          v-model="inputImage"
          accept="image/*"
          label="Please upload the image file"
          prepend-icon="mdi-image"
          @change="onImagePicked"
        ></v-file-input>
        <v-textarea
          outlined
          clearable
          clear-icon="mdi-close-circle"
          label="remarks"
          v-model="remarks"
        ></v-textarea>
        <div class="d-flex justify-space-around">
          <v-btn
            elevation="5"
            color="red darken-4"
            @click="$emit('close-dialog')"
          >CANCEL</v-btn>
          <v-btn
            elevation="5"
            color="light-blue"
            @click="emitNewImage"
          >POST</v-btn>
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: "newPost",

  props: ["displayForm"],

  data: () => ({
    inputImage: null,
    uploadImageUrl: "",
    remarks: ""
  }),

  methods: {
    onImagePicked(file) {
      if(file !== undefined && file !== null) {
        if(file.name.lastIndexOf(".") <= 0) return;
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.addEventListener("load", () => {
          this.uploadImageUrl = fileReader.result;
        });
      } else {
        this.uploadImageUrl = "";
      }
    },
    emitNewImage() {
      this.$emit("postNewImage", {
        inputImage: this.inputImage,
        uploadImageUrl: this.uploadImageUrl,
        remarks: this.remarks
      });
    }
  }
};
</script>