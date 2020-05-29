import $axios from 'axios';
import VueRouter from 'vue-router';

const $router = new VueRouter();

export const state = () => ({
  user: {
    username: '',
    token: '',
    balance: 0,
    paymentOperations: [],
  },
});

export const actions = {
  async register(context, { username, password, error }) {
    console.log();
    // actions.login(context, { username, password })
    return;
    const response = await $axios.post('/account/register', {

    })
      .catch((e) => { error(e) });
    await $router.push(`/profile/${username}`);
  },

  login(context, { username, password }) {
    // server request

    context.commit('setUserData');
  },

  logout(context) {
    context.commit('clearUserData');
  }
};

export const mutations = {
  setUserData(state, userData) {
    state.user = { ...state.user, ...userData };
  },

  clearUserData(state) {
    state.user = {
      username: '',
      token: '',
    };
  },
};
