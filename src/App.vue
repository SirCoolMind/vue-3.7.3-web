<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <Navigation />
  <RouterView />
  <DialogsWrapper />
</template>

<script>
import Navigation from "@/components/Navigation.vue";

export default {
  components: {
    Navigation
  }
};
</script>

<style scoped>
</style>
