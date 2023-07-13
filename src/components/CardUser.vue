<template>
  <div class="card outer"  v-on:click="clickCard">
     <div class="card-avatar">
      <img>
    </div>
    <div class="card-block">
      <div class="text-black card-block-label-top">
        {{ user.name }}
      </div>
      <div class="text-grey card-block-label-bottom">
        {{ user.email }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardUser',
  props: {
    user: {
      type: Object,
      require: true,
    },
    selectClick: {
      type: Function,
      default: () => {
        console.log('default click user');
      },
    },
  },
  setup(props) {
    function clickCard() {
      props.selectClick(props.user);
    }
    return {
      clickCard,
    };
  },
};
</script>
<style>
.outer {
  position: relative;
}
</style>
