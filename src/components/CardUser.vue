<template>
  <div class="card outer"  v-on:click="clickCard">
    <div class="card-avatar">
      <img  src="../assets/avatar.png"/>
    </div>
    <div :class="`card-block ${isSelect() ? 'bg-selected' : 'bg-standart'}`">
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
    isSelect: {
      type: Function,
      default: () => false,
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
<style lang="scss">
.bg-standart {
  background: #FFF;
}
.bg-selected {
  background: #c5c2c2;
}
.outer {
  position: relative;
}
.card {
    display: grid;
    grid-template-columns: 60px calc(100% - 60px);
    cursor: pointer;
    margin: 5px;
    padding: 2px;
    height: 60px;
    color: rgb(0, 0, 0);
    font-size: small;
    &-avatar {
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.10);
        border-radius: 10px 0px 0px 10px;
        border-right: 1px solid #E0E0E0;
        background: rgb(238, 238, 238) 50%;
        background-size: cover;
        img {
          width: 100%;
          height: 100%;
        }
    }
    &-block {
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.10);
        border-radius: 0px 10px 10px 0px;
        border-right: 1px solid #E0E0E0;
        min-width: 220px;
        &-label-top {
            position: relative;
            top: 25%;
            left: 15px;
            transform: translateY(-25%);
          }
        &-label-bottom {
            position: relative;
            top: 50%;
            left: 15px;
            transform: translateY(-75%);
        }
    }
}
</style>
