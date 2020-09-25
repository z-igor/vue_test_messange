<template>
  <div id="app">
    <div class="n-header">
      <router-link to="/" v-show="reTitle !== 'Home'">Home</router-link>
      <p>{{ reTitle }}</p>
    </div>
    <router-view />
  </div>
</template>

<script>
import "@/styles/style.scss";

export default {
  name: "app",
  data: () => ({
    title: "Home"
  }),
  computed: {
    reTitle() {
      if (this.$route.meta.title) {
        return this.$route.meta.title;
      }

      return this.title;
    }
  },
  mounted() {}
};
</script>
