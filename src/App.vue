<template>
  <div id="app">
    <!-- <hoge /> -->
    <div id="nav">
      <input v-model.trim="text" />
      <input id="hoge" value="Hoge" type="checkbox" v-model="hoge" />
      <label for="hoge">Hoge</label>

      <input id="rad-v1" value="v1" type="radio" v-model="rad" />
      <label for="rad-v1">v1</label>
      <input id="rad-v2" value="v2" type="radio" v-model="rad" />
      <label for="rad-v2">v2</label>

      <select v-model="selected">
        <option disabled value>Please select one</option>
        <option value="FOOO">A</option>
        <option>B</option>
        <option :value="rad">C</option>
      </select>

      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
      <div @click.passive="clicked('div')">
        foo
        <a href="http://example.com" @click.prevent="clicked('a')">hoge</a>
      </div>
    </div>
    <router-view />
    <!-- <transition>
      <router-view name="sub" />
    </transition>-->
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script lang="ts">
export default {
  data() {
    return {
      hoge: [],
      rad: null,
      selected: '',
      text: '',
    };
  },

  beforeRouteUpdate(to: any, from: any, next: any) {
    console.warn(to, from, next);
    next();
  },

  methods: {
    clicked(ev: string) {
      console.log(ev);
    },
  },
  // watch: {
  //   $route(to: any, from: any) {
  //     console.log(to, from);
  //   },
  // },
};
</script>
