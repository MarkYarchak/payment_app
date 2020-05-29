<template>
  <v-app>
    <v-app-bar height="64">
      <v-toolbar-title>Simple pay app</v-toolbar-title>
    </v-app-bar>
    <div class="screen-height d-flex justify-center align-center pa-5">
      <nuxt />
    </div>
  </v-app>
</template>

<script>
export default {
  name: "login",
  middleware: ['allowLoginPage'],
};
</script>

<style scoped>
  .screen-height {
    height: calc(100vh - 64px);
  }
</style>
