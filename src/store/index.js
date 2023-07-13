import { createStore } from 'vuex';
import axiosInstance from '../api/index';
import { USERS } from '../api/routes';

const store = createStore({
  state: {
    users: [],
  },
  mutations: {
    setUsers: (state, newUsers) => {
      // eslint-disable-next-line no-param-reassign
      state.users.length = 0;
      state.users.push(...newUsers);
    },
  },
  actions: {
    fetchAllUsers: () => new Promise((resolve, reject) => {
      axiosInstance.get(USERS()).then(({ data }) => {
        store.commit('setUsers', data);
        resolve(data);
      }).catch((e) => reject(e));
    }),
  },
});

export default store;
