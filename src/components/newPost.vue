<template>
    <v-card>
        <v-container>
            <v-file-input
                v-model="input_image"
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
        </v-container>
    </v-card>
</template>

<script>

export default {
  name: "newPost",

  data: () => ({
    input_image: null,
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
    }
  }
};
</script>