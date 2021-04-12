/**
 * @file 系统下拉菜单
 */
import {VueConstructor} from 'vue';
import RoboSystemDropdown from './robo-system-dropdown.vue';

export default {
    install(Vue: VueConstructor) {
        Vue.component('RoboSystemDropdown', RoboSystemDropdown);
    }
};
