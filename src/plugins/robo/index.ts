/**
 * @file 组装基于 ElementUI 定制的 UI 组件
 */
import Vue from 'vue';
import RoboSystemDropdown from '@/plugins/robo/robo-system-dropdown/index';
import RoboPagination from './robo-pagination/index';

Vue.use(RoboSystemDropdown);
Vue.use(RoboPagination);

import store from '@/store/index';
// 注册一个全局自定义指令 `v-allow` 根据权限控制操作按钮的隐显
Vue.directive('allow', {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: function(el: any, binding, vnode) {
        const grantedResouse = JSON.parse(store.getters.getGrantedResouse());
        const hasAuth = grantedResouse.some((item: any) => {
            return binding.value.name === item.resourceName;
        });
        if (!hasAuth) {
            el.parentNode.removeChild(el);
        }
    }
});
