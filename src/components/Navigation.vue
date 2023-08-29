<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container">
      <div class="navbar-header">
        <router-link class="navbar-brand" to="/">{{title }}</router-link>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="nav navbar-nav">
          <router-link
            v-if="!isLoggedIn"
            class="nav-item nav-link"
            :to="{ name: 'Login' }"
          >
            Login
          </router-link>
          <router-link
            v-if="!isLoggedIn"
            class="nav-item nav-link"
            :to="{ name: 'Register' }"
          >
            Register
          </router-link>
          <router-link
            v-if="isLoggedIn"
            class="nav-item nav-link"
            :to="{ name: 'Dashboard' }"
          >
            Dashboard
          </router-link>
          <router-link
            v-if="isLoggedIn"
            class="nav-item nav-link"
            :to="{ name: 'about' }"
          >
            About
          </router-link>
          <router-link
            v-if="isLoggedIn"
            class="nav-item nav-link"
            :to="{ name: 'tasks' }"
          >
            Tasks
          </router-link>
          <a
            class="nav-item nav-link"
            v-if="isLoggedIn"
            @click.prevent="logout"
            href="#"
            >Logout</a
          >
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import User from "@apis/User";

export default {
  data() {
    return {
      isLoggedIn: false,
      title: import.meta.env.VITE_APP_TITLE ?? "ViteAppTitle"
    };
  },

  mounted() {
    this.$on("login", () => {
      this.isLoggedIn = true;
    });

    this.isLoggedIn = !!localStorage.getItem("token");
  },

  methods: {
    logout() {
      User.logout().then(() => {
        localStorage.removeItem("token");
        this.isLoggedIn = false;
        this.$router.push({ name: "Home" });
      });
    }
  }
};
</script>

<style>
.router-link-exact-active {
  color: #ffffff !important;
  transition: all 0.25s;
}
</style>
