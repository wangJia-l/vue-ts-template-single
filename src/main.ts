import Vue from 'vue';
import router from './router';
import App from './App.vue';
import store from './store';

import './plugins';

import '@/styles/reset.css';

Vue.config.productionTip = false;

import '@/libs/TextIconOverlay.js';
import '@/libs/MarkerClusterer.js';

// 全局异常处理，可以在此添加异常监控和上报
Vue.config.errorHandler = function(err, vm, info) {
    console.group('Local Error Handler');
    console.error('info:', info);
    console.error('vm:', vm);
    console.error('error:', err);
    console.groupEnd();
};

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');
