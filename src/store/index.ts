import Vue from 'vue';
import Vuex from 'vuex';
import RootStore from '@/store/root-store/index';
Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV === 'development',
    state: {
        ...RootStore.state
    },
    getters: {
        ...RootStore.getters
    },
    mutations: {
        ...RootStore.mutations
    },
    actions: {
        ...RootStore.actions
    }
});
