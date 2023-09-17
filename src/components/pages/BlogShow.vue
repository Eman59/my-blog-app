<template>
  <layout-div>
    <h2 class="text-center mt-5 mb-3">Show Blogs</h2>
    <div class="card">
      <div class="card-header">
        <router-link class="btn btn-outline-info float-right" to="/"
          >View All Blogs
        </router-link>
      </div>
      <div class="card-body">
        <b className="text-muted">Title:</b>
        <p>{{ project.name }}</p>
        <b className="text-muted">Content Preview:</b>
        <p>{{ project.description }}</p>
      </div>
    </div>
  </layout-div>
</template>

<script>
import axios from "axios";
import LayoutDiv from "../LayoutDiv.vue";
import Swal from "sweetalert2";

export default {
  name: "BlogShow",
  components: {
    LayoutDiv,
  },
  data() {
    return {
      project: {
        name: "",
        description: "",
      },
      isSaving: false,
    };
  },
  created() {
    const id = this.$route.params.id;
    axios
      .get(`/api/projects/${id}`)
      .then((response) => {
        let projectInfo = response.data;
        this.project.name = projectInfo.name;
        this.project.description = projectInfo.description;
        return response;
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "An Error Occured!",
          showConfirmButton: false,
          timer: 1500,
        });
        return error;
      });
  },
  methods: {},
};
</script>
