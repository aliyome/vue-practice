import { mutations, actions } from '@/store';

describe('Vuex', () => {
  describe('mutation', () => {
    it('increment', () => {
      const state = { count: 0 };
      mutations.increment(state);
      expect(state.count).toBe(1);
    });
  });

  describe('action', () => {
    it('increment', async () => {
      const commit = jest.fn();
      const state = {};
      await actions.increment({ commit });
      expect(commit).toBeCalledWith('increment');
    });
  });
});
