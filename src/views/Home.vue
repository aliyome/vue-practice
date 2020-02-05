<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button @click="ddd = { a: ddd.a + 1, b: 2 }">incr</button>
    <HelloWorld
      v-model="model"
      @bbbb="onBBBB($event)"
      msg="Welcome to Your Vue.js App"
      :ddd="ddd"
      num="hoge"
    >
      <!-- <template v-slot:default="t">{{ t.bar + 'parent' }}</template> -->
      <template v-slot="{ bar }">{{ bar + ' destructure' }}</template>
    </HelloWorld>
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

  data() {
    return {
      model: '',
      ddd: { a: 1, b: 2 },
    };
  },

  components: {
    HelloWorld,
  },

  beforeRouteUpdate(to: any, from: any, next: any) {
    console.warn(to, from, next);
  },

  methods: {
    clk() {
      // this.$router.push('/', console.log, console.error);
      // console.log(this.$route);
    },

    onBBBB(ev: any) {
      console.log(ev);
    },
  },
};

export default Home;
</script>
