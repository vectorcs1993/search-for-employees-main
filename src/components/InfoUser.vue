<template>
  <div v-if="user">
    Имя: {{ user.name }}
  </div>
  <div v-else class="info-block-empty-label">
    <h6 class="text-grey">
      Выберите сотрудника, что бы посмотреть его профиль
    </h6>
  </div>
</template>

<script>
export default {
  name: 'InfoUser',
  props: {
    user: {
      type: Object,
      require: false,
    },
  },
  setup() {
    return {
    };
  },
};
</script>
