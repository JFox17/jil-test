<template>
    <div :class="$style.sidebar">
        <div :class="$style.sidebar__block">
            <p :class="$style['sidebar__block--label']">
                Поиск сотрудников
            </p>
            <input
                v-model="users"
                :class="[
                    $style['sidebar__block--input'],
                    { [$style['sidebar__block--invalid']]: invalid }
                ]"
                type="text"
                placeholder="Введите Id или имя"
                @change="searchUser()"
                @input="validteInput()"
            />
            <span
                v-if="invalid"
                :class="$style['sidebar__block--error']"
            >
                Не корректные данные
            </span>
        </div>
        <div :class="$style.sidebar__block">
            <p :class="$style['sidebar__block--label']">
                Результаты
            </p>
            <span v-if="loading" :class="$style['sidebar__block--loading']" />
            <Transition name="loading" tag="div">
                <p v-if="!persons.length">
                    {{ resultText }}
                </p>
                <transition-group
                    v-else
                    :class="$style.sidebar__cards"
                    name="list"
                    tag="div"
                >
                    <div
                        v-for="item in persons"
                        :key="item.id"
                        :class="[
                            $style.sidebar__card,
                            {
                              [ $style['sidebar__card--active'] ]: item.id === activePerson.id
                            }
                        ]"
                        @click="$store.dispatch('getActivePerson', item.id)"
                    >
                        <div :class="$style['sidebar__card--img']">
                            <img src="@/assets/image/img.svg" />
                        </div>
                        <div :class="$style['sidebar__card--text']">
                            <p>{{ item.name }}</p>
                            <span> {{ item.email }}</span>
                        </div>
                    </div>
                </transition-group>
            </Transition>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            users: '',
            invalid: false,
            loading: false
        }
    },
    computed: {
      ...mapState([ 'persons', 'activePerson']),
      resultText() {
        return this.users === '' ? 'начните поиск' : 'ничего не найдено'
      }
    },
    methods: {
        /**
         * filter and get persons
         */
        async searchUser() {
            if (!this.invalid) {
                //filter
                const users = this.users.trim().replace(/,*$/, '').replace(/\s/g, '')
                const arrUsers = users.split(/\,/)

                //create params
                const params = this.createParams( arrUsers )

                // get Persons 
                this.loading = true
                await this.$store.dispatch('getPersons', params)
                this.loading = false
            }
        },
        /**
         * create params for request
         * @param { Array } arrUsers  user's array
         */
        createParams( arrUsers ) {
            const regNumber = /\d+/
            const regString = /^[a-zA-Z0-9]*$/
            return arrUsers.reduce((acc, it, index) => {
                const union = index === 0 ? '' : '&'
                if (regNumber.test(it)) {
                    acc = acc + union + `id=${it}`
                } else if (regString.test(it)) {
                    acc = acc + union + `username=${it}`
                }
                return acc
            }, '?')
        },
        /**
         * validate input for request
         */
        validteInput() {
            this.invalid = /([.$?*|{}()[\]+^])/g.test(this.users)
        }
    }
}
</script>

<style module lang="scss">
@use '~/assets/style/extends' as *;

.sidebar {
  background: $grey;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 29px 0;

  &__block {
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 14px 0;

    &--label {
        @extend %medium-bold;
    }
    &--input {
        @extend %input-grey;
        @extend %normal;
    }
    &--invalid {
        @extend %input-red;
    }
    &--error {
        color: $red;
        @extend %normal;
        position: absolute;
        bottom: -20px;
    }
    &--loading {
        position: absolute;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 48px;
        height: 48px;
        border: 5px solid $black;
        border-bottom-color: transparent;
        border-radius: 50%;
        display: inline-block;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }
  }

  &__cards {
    display: flex;
    flex-direction: column;
    gap: 18px 0;
  }

  &__card {
    display: flex;
    background: $white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 0px 10px 0px #0000001A;
    height: 70px;
    cursor: pointer;
    &--img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 29%;
        border-right: 1px solid $border-grey;
        &,
        & > img {
            height: inherit;
        }
    }
    &--text {
        width: 71%;
        padding: 15px;
        transition: 0.4s;
        & > p {
            @extend %normal-bold;
        }
        & > span {
            @extend %normal;
        }
    }
    &--active {
        .sidebar__card--text {
            background: $border-grey;
        }
        
    }
  }
  @media(min-width: $screen-s-min) {
    padding: 27px 30px 27px 19px;
  }

  @media(min-width: $screen-xl-min) {
    padding: 1.88vw 2.08vw 1.88vw 1.32vw;
    gap: 2.01vw 0;

    &__block {
        gap: 0.97vw 0;
        &--error {
            bottom: -1.39vw;
        }
        &--loading {
            width: 3.33vw;
            height: 3.33vw;
            border: 0.35vw solid $black;
        }
    }

    &__cards {
        gap: 1.25vw 0;
    }

    &__card {
        border-radius: 0.69vw;
        box-shadow: 0px 0px 0.69vw 0px #0000001A;
        height: 4.86vw;
        &--img {
            border-right: 0.07vw solid $border-grey;
        }
        &--text {
            padding: 1.04vw;
        }
    }
  }
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
} 
</style>
<style lang="scss">
.loading-enter-active {
    transition: all .3s ease;
    transition-delay: 1s;
}
.loading-leave-active {
  transition: all .4s;
}
.loading-enter, .loading-leave-to {
  transform: translateX(10px);
  opacity: 0;
}


.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
