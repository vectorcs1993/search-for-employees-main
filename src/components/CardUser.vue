<template>
  <div class="card-block outer" v-on:click="clickCard">
    <div class="text-black innerName">
      {{ user.name }}
    </div>
    <div class="text-grey innerEmail">
      {{ user.email }}
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

.innerName {
    position: absolute;
    top: 25%;
    transform: translateY(-25%);
}
.innerEmail {
    position: absolute;
    top: 75%;
    transform: translateY(-75%);
}
</style>
