<template>
  <div class="row">
    <h2 class="row-col-left text-red">Жилфонд</h2>
    <h4 class="row-col-right text-grey">Пользователь</h4>
  </div>
  <table class="container">
    <td class="pa sidebar">
      <h4>Поиск сотрудников</h4>
      <div class="input-layout">
        <input v-model="search" placeholder="Введите имя сотрудника"
          @update:model-value="findUserByName" />
      </div>
      <Preloader v-if="preload" color="grey" :scale="0.5" />
      <h4 v-if="!preload && search.length > 0">Результаты ({{ users.length }})</h4>
      <div class="userlist"
      v-if="!preload && users.length > 0 && search.length > 0">
          <CardUser v-for="user in users" :key="user.id" :user="user"
            :selectClick="selectCardUser" :isSelect="() => {
              if (selectUser) {
                return selectUser.id == user.id
              }
                return false;
              }" />
      </div>
      <h6 class="text-grey" v-if="!preload && users.length == 0 && search.length > 0">
        {{ message }}
      </h6>
      <h4 v-if="!preload && search.length == 0">
        Наните поиск
      </h4>
    </td>
    <td class="pa info-block">
      <Preloader class="preloader-user" v-if="preloadUser" color="grey" :scale="0.8" />
      <InfoUser v-else :user="selectUser"
        :labelEmpty="messageUser" />
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
    const preloadUser = ref(false);
    const search = ref('');
    const users = ref([]);
    const selectUser = ref(null);
    const message = ref('');
    const messageFindUsers = 'Выберите сотрудника, что бы посмотреть его профиль';
    const messageUser = ref(messageFindUsers);
    function errorCatch() {
      // setTimeout - эмуляция ожидания обработки
      // для проверки корректной работы прелоадера
      setTimeout(() => {
        message.value = 'Ошибка запроса!';
        preload.value = false;
        preloadUser.value = false;
      }, 1000);
    }

    // выбор пользователя и запрос по ID
    // по факту в ответе от api по конкретному ID может
    // больше информации о пользователе
    function selectCardUser(usr) {
      if (usr && !preloadUser.value) {
        selectUser.value = usr;
        preloadUser.value = true;
        store.dispatch('fetchUserId', usr.id).then((dataUser) => {
          setTimeout(() => {
            selectUser.value = dataUser;
            preloadUser.value = false;
            messageUser.value = messageFindUsers;
          }, 500);
        }).catch(() => {
          // setTimeout - эмуляция ожидания обработки
          // для проверки корректной работы прелоадера
          setTimeout(() => {
            selectUser.value = null;
            messageUser.value = 'Пользователь не найден!';
            preloadUser.value = false;
          }, 500);
        });
      }
    }

    // поиск пользователя по фильтру атрибута name
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
        // setTimeout - эмуляция запроса большого количества данных
        // для проверки корректной рабоиты прелоадера
        setTimeout(() => {
          preload.value = false;
          if (users.value.length === 0) {
            message.value = 'ничего не найдено';
          }
        }, 1000);
      }).catch(errorCatch);
    }
    return {
      selectCardUser,
      findUserByName,
      selectUser,
      search,
      preload,
      preloadUser,
      users,
      message,
      messageUser,
    };
  },
};
</script>
<style lang="scss">
.row {
  display: grid;
  grid-template-columns: 50% 50%;
  &-col-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-col-left {
    display: flex;
    align-items: center;
    justify-content: left;
  }
  &-col-right {
    display: flex;
    align-items: center;
    justify-content: right;
  }
}
.sidebar {
  border-radius: 10px 0px 0px 10px;
  width: 35%;
  color: rgb(0, 0, 0);
  background-color: #FDFDFD;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.30);
  border-right: 1px solid #E0E0E0;
}
.userlist {
  height: calc(100% - 180px);
  overflow: hidden;
  overflow-y: auto;
}
input {
  padding: 5px;
  width: calc(100% - 15px);
  height: 32px;
  font-size: medium;
  outline: none !important;
  border-radius: 8px;
  border: 1.5px solid var(--all-colors-gray-gray-200, #a8aaac);
  background: var(--all-colors-black-white-white, #FFF);
  font-family: 'Montserrat', sans-serif;
  font-weight: bolder;
}
.preloader-user {
  top: 0%;
  left: 50%;
}
</style>
