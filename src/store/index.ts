import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const moduleA = {
  namespaced: true,
  state: { val: 0 },
  getters: { getVal: (state: any) => state.val },
};
const moduleB = {
  namespaced: true,
  state: { val: 0 },
  getters: { getVal: (state: any) => state.val },
};

export const mutations = {
  increment: (state: any) => state.count++,
  setCount: (state: any, { count }: any) => (state.count = count),
};

export const actions = {
  increment: async ({ commit }: any) => {
    await delay(1000);
    commit('increment');
  },
};

export default new Vuex.Store({
  strict: true,
  state: {
    count: 0,
  },
  getters: {
    countPlus1: state => state.count + 1,
  },
  mutations,
  actions,
  modules: { moduleA, moduleB },
});
