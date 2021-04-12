/**
 * @file 基于 el-pagination 的定制翻页组件
 */
import {VueConstructor} from 'vue';
import RoboPagination from './robo-pagination.vue';

export default {
    install(Vue: VueConstructor) {
        Vue.component('RoboPagination', RoboPagination);
    }
};
