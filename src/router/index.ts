import Vue from 'vue';
import VueRouter, {RouteConfig, RawLocation, Route} from 'vue-router';
import {CommonUrls, lazyLoadHelper} from '@/utils';
import {beforeEachCallback, beforeResolveCallback, afterEachCallback} from '@/router/router-guards/index';
Vue.use(VueRouter);

interface OriginalPush {
    (location: RawLocation): Promise<Route>;
}

const originalPush: OriginalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location: RawLocation): Promise<Route> {
    return originalPush.call(this, location).catch((err) => err);
};

const routes: RouteConfig[] = [
    {
        path: CommonUrls.Root,
        redirect: '/home'
    },
    {
        path: CommonUrls.Login,
        component: lazyLoadHelper('common/login')
    },
    {
        // 业务路由
        path: '/home',
        name: 'Layout',
        component: (resolve) => require(['@/views/pages/Layout/index'], resolve),
        redirect: '/home/home1',
        children: [
            {
                path: 'home1',
                name: 'Home1',
                component: lazyLoadHelper('pages/Home/home1')
            },
            {
                path: 'home2',
                name: 'Home2',
                component: lazyLoadHelper('pages/Home/home2')
            },
            {
                path: '*',
                name: 'NotFound',
                component: lazyLoadHelper('common/404')
            }
        ]
    },
    {
        path: '/list',
        name: 'Layout',
        redirect: '/list/list1',
        component: (resolve) => require(['@/views/pages/Layout/index'], resolve),
        children: [
            {
                path: 'list1',
                name: 'List',
                component: lazyLoadHelper('pages/List/list1')
            },
            {
                path: '*',
                name: 'NotFound',
                component: lazyLoadHelper('common/404')
            }
        ]
    },
    {
        path: CommonUrls.NotFound,
        component: lazyLoadHelper('common/404')
    },
    {
        path: '*',
        redirect: CommonUrls.NotFound
    }
];

const router = new VueRouter({routes});

// 全局前置导航
router.beforeEach(beforeEachCallback);

// 全局解析前置
router.beforeResolve(beforeResolveCallback);

// 全局后置
router.beforeResolve(afterEachCallback);

export default router;
