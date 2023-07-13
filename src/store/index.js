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
    fetchUsers: () => axiosInstance.get(USERS()).then(({ data }) => {
      console.log(data);
      store.commit('setUsers', data);
    }).catch((e) => console.log(e)),
  },
});

export default store;
