<template>
  <h2 class="text-red">Жилфонд</h2>
  <table class="full-width full-height">
    <td class="pa sidebar">
      <div>
        <h4>Поиск сотрудников</h4>
        <input v-model="search" placeholder="Введите имя сотрудника" />
      </div>
      <div>
        <h4>Результаты</h4>
        <div class="userlist" v-if="users.length > 0">
          <CardUser
            class="full-width"
            v-for="user in users"
            :key="user.id"
            :user="user"
            :selectClick="selectCardUser"
          />
        </div>
        <div class="text-red" v-else>
          Сотрудники с именем "{{ search }}" не найдены
        </div>
      </div>
    </td>
    <td v-if="users.length > 0" class="pa info-block">
      <InfoUser v-if="selectUser" :user="selectUser" />
      <div v-else>Выберите пользователя</div>
    </td>
  </table>
</template>
<script>
import { ref } from 'vue';
import CardUser from './CardUser.vue';
import InfoUser from './InfoUser.vue';

export default {
  name: 'FindUsers',
  components: {
    CardUser,
    InfoUser,
  },
  setup() {
    const search = ref('');
    const selectUser = ref(null);
    function selectCardUser(usr) {
      selectUser.value = usr || null;
    }
    return {
      selectCardUser,
      selectUser,
      search,
    };
  },
  created() {
    this.$store.dispatch('fetchUsers');
  },
  methods: {
    findUser(prop, searchText) {
      return this.$store.state.users.filter(
        (object) => object[prop].indexOf(searchText) !== -1,
      );
    },
  },
  computed: {
    users() {
      return this.findUser('name', this.search || '');
    },
  },
};
</script>
<style lang="scss"></style>
