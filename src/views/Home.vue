<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { Component } from 'vue';

export const Home: Component = {
  name: 'home',
  components: {
    HelloWorld,
  },
};

export default Home;
</script>
