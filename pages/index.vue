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
    <SideBar />
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
export default {
  name: 'IndexPage',
  components: {
    SideBar
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
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 25px 0;
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
}
</style>
