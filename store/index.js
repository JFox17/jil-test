export const state = () => ({
    persons: [],
    loading: false,
    activePerson: { id: 0 }
})


export const mutations = {
    setPersons (state, payload) {
        state.persons = payload
    },
    setActivePerson (state, payload) {
        state.activePerson = payload
    },
}

export const actions = {
    getPersons ({ dispatch, commit }, params) {
        return this.$axios.$get('/users' + params).then((res) => {
          commit('setPersons', res)
          
          if(res.length) {
            dispatch('getActivePerson', res[0].id)
          }
          
        })
    },
    getActivePerson ({ commit, state }, id) {
       const person = state.persons.find(person => person.id === id)
       commit('setActivePerson', person)
    }
}
