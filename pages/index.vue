<template>
  <div :class="$style.container">
    <div :class="$style.search__header">
      <div :class="$style['search__header--line']">
        <h1 :class="$style['search__header--logo']" href="/">
          Жилфонд
        </h1>
        <p :class="$style['search__header--name']">
          {{ activePerson.name }}
        </p>
      </div>
    </div>
    <div :class="$style.search__content">
      <SideBar />
      <Card />
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import SideBar from '@/components/SideBar.vue';

export default {
  name: 'IndexPage',
  components: {
    Card, SideBar
  },
  computed: {
      activePerson () {
        return this.$store.state.activePerson
      },
  }
}
</script>

<style module lang="scss">
@use '~/assets/style/extends' as *;

.container {
  background: $white;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  gap: 25px 0;
  @media (min-width: $screen-s-min) {
    padding: 50px;
  }
  @media (min-width: $screen-xl-min) {
    padding: 3.47vw;
    gap: 1.74vw 0;
  }
}

.search {
    background: $white;

    &__header {
      &--line {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
      }
      &--logo {
          @extend %large-bold;
          color: $red;
      }
      &--name {
          @extend %medium;
      }
    }
    &__content {
      background: $grey;
      box-shadow: 0px 0px 10px 0px #0000001A;
      border-radius: 10px;
      min-height: 80vh;
      @media(min-width: $screen-sm-min) {
        display: flex;
      }
    }
}
</style>
