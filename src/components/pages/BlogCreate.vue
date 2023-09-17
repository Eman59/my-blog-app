<template>
  <layout-div>
    <h2 class="text-center mt-5 mb-3">Post New Blog</h2>
    <div class="card">
      <div class="card-header">
        <router-link class="btn btn-outline-info float-right" to="/"
          >View All Blogs
        </router-link>
      </div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <label htmlFor="name">Title</label>
            <input
              v-model="project.name"
              type="text"
              class="form-control"
              id="name"
              name="name"
            />
          </div>
          <div class="form-group">
            <label htmlFor="description">Content Preview</label>
            <textarea
              v-model="project.description"
              class="form-control"
              id="description"
              rows="3"
              name="description"
            ></textarea>
          </div>
          <div class="form-group mt-3">
            <label for="image">Image&ensp;</label>
            <input
              type="file"
              class="form-control-file"
              id="image"
              name="image"
              accept="image/*"
              @change="handleImageUpload"
            />
          </div>
          <button
            @click="handleSave()"
            :disabled="isSaving"
            type="button"
            class="btn btn-outline-primary mt-3"
          >
            Save Post
          </button>
        </form>
      </div>
    </div>
  </layout-div>
</template>

<script>
import axios from "axios";
import LayoutDiv from "../LayoutDiv.vue";
import Swal from "sweetalert2";

export default {
  name: "BlogCreate",
  components: {
    LayoutDiv,
  },
  data() {
    return {
      project: {
        name: "",
        description: "",
        image: null,
      },
      isSaving: false,
    };
  },
  methods: {
    handleImageUpload(event) {
      // Get the selected image file
      this.project.image = event.target.files[0];
    },
    handleSave() {
      this.isSaving = true;

      // Create a FormData object to include the image and other data
      const formData = new FormData();
      formData.append("name", this.project.name);
      formData.append("description", this.project.description);
      formData.append("image", this.project.image);

      axios
        .post("/api/projects", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type for file upload
          },
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Post saved successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          this.isSaving = false;
          this.project.name = "";
          this.project.description = "";
          this.project.image = null; // Clear the selected image

          // Reset the image input field
          const imageInput = document.getElementById("image");
          if (imageInput) {
            imageInput.value = "";
          }

          return response;
        })
        .catch((error) => {
          this.isSaving = false;
          Swal.fire({
            icon: "error",
            title: "An Error Occurred!",
            showConfirmButton: false,
            timer: 1500,
          });
          return error;
        });
    },
  },
};
</script>
