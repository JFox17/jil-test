<template>
    <div :class="$style.card">
        <Transition name="loading">
            <div v-if="person.id" :class="$style.card__wrap">
                <div :class="$style.card__img">
                    <img src="@/assets/image/img-card.png" />
                </div>
                <div :class="$style.card__description">
                    <div :class="$style['card__description--block']">
                        <p :class="$style['card__description--name']">
                            {{ person.name }}
                        </p>
                        <p :class="$style['card__description--email']">
                            <span>email:</span> {{ person.email }}
                        </p>
                        <p :class="$style['card__description--phone']">
                            <span>phone:</span> {{ person.phone }}
                        </p>
                    </div>
                    <p :class="$style['card__description--about']">
                        О себе:
                    </p>
                    <span :class="$style['card__description--detail']">
                        {{ defaultDescription }}
                    </span>
                </div>
            </div>
            <p v-else :class="$style.card__default"> 
                <span>Выберите сотрудника, чтобы посмотреть его профиль</span>
            </p>
        </Transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            defaultDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
    },
    computed: {
      person () {
        return this.$store.state.activePerson
      },
    }
}
</script>

<style module lang="scss">
@use '~/assets/style/extends' as *;

.card {
    padding: 20px 10px;
    &__wrap {
        display: flex;
        flex-direction: column;
        gap: 25px 0;
    }
    &__default {
        @extend %normal;
        color: $dark-grey;
    }
    &__img {
        border: 1px solid $border-grey;
        max-width: 424px;
        width: 100%;
        margin: auto;
    }
    &__description {
        &--block {
            display: flex;
            flex-direction: column;
            gap: 10px 0;
        }
        &--about,
        &--name {
            @extend %medium-bold;
        }
        &--email,
        &--phone,
        &--detail {
            @extend %normal;
            color: $dark-grey;
        }
        &--email,
        &--phone {
            & > span {
                @extend %normal-bold;
                color: $black;
            }
        }
        &--about {
            margin: 20px 0 25px;
        }
    }
    @media(min-width: $screen-s-min) {
        padding: 30px 20px;
    }
    @media(min-width: $screen-m-min) {
        width: 100%;
        &__wrap {
            flex-direction: row;
            align-self: flex-start;
            justify-content: flex-start;
            gap: 0 4.57vw;
        }
        &__description {
            width: 32.86vw;
        }
        &__default {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        }
        &__img {
            width: 48%;
            margin: 0;
            height: fit-content;
        }
    }
    @media(min-width: $screen-xl-min) {
        padding: 2.08vw 1.39vw;
        &__img {
            max-width:29.44vw;
            border-width: 0.07vw;
        }
        &__description {
            &--block {
                gap: 0.69vw 0;
            }
        }
        &--about {
            margin: 1.39vw 0 1.74vw;
        }
    }
}   
</style>
<style scoped lang="scss">
@use '@/assets/style/modules/Transition.module.scss';
</style>
