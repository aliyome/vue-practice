import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld.vue';
import Home from '@/views/Home.vue';
import App from '@/App.vue';
import VueRouter from 'vue-router';
import Store from 'vuex';

import store from '@/store';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });

  it('キー入力するとイベントを発火する', () => {
    const wrapper = shallowMount(HelloWorld);
    wrapper.find('[data-test=hello-world-input]').setValue('a');
    expect(wrapper.emitted().input[0]).toEqual(['a']);
  });
});

describe('Home.vue', () => {
  it('renders incr button', () => {
    const wrapper = shallowMount(Home, {
      propsData: { id: 0, p: 0 },
      stubs: ['router-link', 'router-view'],
      // localVue,
    });
    expect(wrapper.text()).toMatch('incr');
  });
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('App.vue', () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  it('incrボタンを押すと、1秒後にカウントの表示が+1される', async () => {
    const wrapper = shallowMount(App, {
      localVue,
      store,
    });
    expect(wrapper.find('[data-test=count]').text()).toMatch('0');
    wrapper.find('[data-test=incr-button]').trigger('click');
    await delay(1100);
    expect(wrapper.find('[data-test=count]').text()).toMatch('1');
  });
});
