<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="clk">break $router</button>
    <router-view />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

// TODO: 型をもたせたい → vue-property-decorator?
export const Home = {
  name: 'home',

  props: ['id', 'p'],

  components: {
    HelloWorld,
  },

  beforeRouteUpdate(to: any, from: any, next: any) {
    console.warn(to, from, next);
  },

  methods: {
    clk() {
      this.$router.push('/', console.log, console.error);
      // console.log(this.$route);
    },
  },
};

export default Home;
</script>
