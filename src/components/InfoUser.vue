<template>
  <div>
    Имя: {{ user.name }}
  </div>
</template>

<script>
export default {
  name: 'InfoUser',
  props: {
    user: {
      type: Object,
      require: true,
    },
  },
  setup() {
    return {
    };
  },
};
</script>

<style></style>
