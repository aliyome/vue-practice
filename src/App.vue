<template>
  <div id="app">
    {{ count }} + 1 = {{ $store.getters.countPlus1 }}
    <span data-test="count">{{ count }}</span>
    <button @click="$store.dispatch('increment')" data-test="incr-button">
      increment
    </button>

    <input
      type="text"
      :value="count"
      @input="setCount({ count: $event.target.value })"
    />

    <input type="text" v-model="countModel" />

    <button @click="show = !show">toggle</button>
    <transition name="hoge">
      <div v-if="show" style="border: 1px solid black;">TOGGLE</div>
    </transition>

    <!-- <div>{{ num }} - {{ numDisp }} - {{ animatedNumber }}</div>
    <input v-model.number="num" step="20" />-->

    <button @click="list.splice(3, 1, 10)">splice(3, 1, 10)</button>
    <button @click="list.splice(3, 0, list.length + 1)">
      splice(3, len, len + 1)
    </button>
    <button @click="list.splice(3, 1)">splice(3, 1)</button>
    <transition-group name="list" tag="div">
      <div v-for="e in list" :key="e">{{ e }}</div>
    </transition-group>

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
.hoge-enter {
  opacity: 0;
}
.hoge-enter-to {
  opacity: 1;
  transition: opacity 1s;
}
.hoge-leave-active {
  opacity: 0;
  transition: opacity 1s;
}

.list-move {
  transition: transform 1s;
}
.list-enter {
  opacity: 0;
}
.list-enter-to {
  opacity: 1;
  transition: opacity 1s;
}
.list-leave-active {
  opacity: 0;
  transition: opacity 1s;
  position: absolute;
}

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
import { mapState, Store, mapMutations } from 'vuex';
declare const gsap: any;

export default {
  data() {
    return {
      hoge: [],
      rad: null,
      selected: '',
      text: '',
      show: true,
      list: [1, 2, 3, 4, 5],
      num: 0,
      numDisp: 0,
    };
  },

  beforeRouteUpdate(to: any, from: any, next: any) {
    console.warn(to, from, next);
    next();
  },

  computed: {
    ...mapState(['count']),

    countModel: {
      get(): any {
        //@ts-ignore
        return this.count;
      },
      set(value: any) {
        //@ts-ignore
        this.setCount({ count: value });
        // this.$store.commit('setCount', { count: value });
      },
    },
  },

  methods: {
    ...mapMutations(['setCount']),
    clicked(ev: string) {
      console.log(ev);
    },
  },
};

// computed: {
//     //   animatedNumber: function() {
//     //     return this.$data.numDisp.toFixed(0);
//     //   },
// }

// watch: {
//   $route(to: any, from: any) {
//     console.log(to, from);
//   },
// },

// watch: {
//   num(newValue: any) {
//     console.log(this.numDisp, newValue);
//     gsap.to(this.$data, { duration: 1, numDisp: newValue });
//     // this.numDisp = gsap.to(this.$data, { duration: 1, x: newValue });
//   },
// },
</script>
