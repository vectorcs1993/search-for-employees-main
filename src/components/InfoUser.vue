<template>
  <div v-if="user" class="info-block-image">
    <img src="../assets/image.png"/>
  </div>
  <div v-if="user" class="info-block-description">
    <div>
        {{ user.name }}
    </div>
    <div>
      Почта:  <span class="text-grey">
        {{ user.email }}
      </span>
    </div>
    <div>
      Номер телефона:  <span class="text-grey">
        {{ user.phone }}
      </span>
    </div>
    <div>
      О себе:
    </div>
    <p>
      {{ user.website }}
    </p>
  </div>
  <div v-else class="info-block-empty-label">
    <h6 class="text-grey">
      {{ labelEmpty }}
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
    labelEmpty: {
      type: String,
    },
  },
  setup() {
    return {
    };
  },
};
</script>
<style lang="scss">
.info-block {
    width: 75%;
    border-radius: 0px 10px 10px 0px;
    color: rgb(0, 0, 0);
    background-color: #FDFDFD;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.30);
    display: grid;
    grid-template-columns: 50% 50%;
    overflow: hidden;
    overflow: auto;
    &-image {
        height: fit-content;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.10);
        border-right: 1px solid #E0E0E0;
        background: rgb(238, 238, 238) 50%;
        img {
          width: 100%;
          height: 100%;
        }
    }
    &-description {
      padding: 15px;
      div, p {
        margin: 10px;
      }
    }
    &-empty-label {
        width: 200%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
