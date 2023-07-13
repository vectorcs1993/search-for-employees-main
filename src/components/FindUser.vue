<template>
  <h2 class="text-red">Жилфонд</h2>
  <table class="container">
    <td class="pa sidebar">
      <h4>Поиск сотрудников</h4>
      <div class="input-layout">
        <input v-model="search" placeholder="Введите имя сотрудника"
        @update:model-value="findUserByName" />
      </div>
      <div>
        <Preloader v-if="preload" color="grey" :scale="0.5" />
        <h4 v-if="!preload && search.length > 0">Результаты ({{ users.length }})</h4>
        <div class="userlist" v-if="!preload && users.length > 0">
          <CardUser
            v-for="user in users"
            :key="user.id"
            :user="user"
            :selectClick="selectCardUser"
          />
        </div>
        <h6 class="text-grey" v-if="!preload && users.length == 0 && search.length > 0">
          ничего не найдено
        </h6>
        <h4 v-if="!preload && search.length == 0">
          Наните поиск
        </h4>
      </div>
    </td>
    <td class="pa info-block">
      <InfoUser :user="selectUser" />
    </td>
  </table>
</template>
<script>
import { ref } from 'vue';
import CardUser from './CardUser.vue';
import InfoUser from './InfoUser.vue';
import Preloader from './Preloader.vue';
import store from '../store';

export default {
  name: 'FindUsers',
  components: {
    CardUser,
    InfoUser,
    Preloader,
  },
  setup() {
    const preload = ref(false);
    const search = ref('');
    const users = ref([]);
    const selectUser = ref(null);
    function selectCardUser(usr) {
      selectUser.value = usr || null;
    }
    function findUserByName() {
      preload.value = search.value.length > 0;
      if (search.value.length === 0) {
        selectUser.value = null;
      }
      store.dispatch('fetchAllUsers').then((data) => {
        users.value.length = 0;
        (search.value ? data.filter(
          (object) => object.name.indexOf(search.value) !== -1,
        ) : []).forEach((user) => {
          users.value.push(user);
        });
        setTimeout(() => {
          preload.value = false;
        }, 1000);
      }).catch((e) => console.log(e));
    }
    return {
      selectCardUser,
      findUserByName,
      selectUser,
      search,
      preload,
      users,
    };
  },
};
</script>
<style lang="scss">
input {
  padding: 5px;
  width: calc(100% - 15px);
  height: 32px;
  font-size: medium;
  border-radius: 8px;
  border: 1.5px solid var(--all-colors-gray-gray-200, #E9ECEF);
  background: var(--all-colors-black-white-white, #FFF);
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
}
</style>
