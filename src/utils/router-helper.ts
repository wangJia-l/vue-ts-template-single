/**
 * @file 路由相关辅助函数
 */

/**
 * 非开发模式路由懒加载
 * @param componentName `./src/pages`下的文件名
 */
export const lazyLoadHelper = (componentName: string): any => {
    if (process.env.NODE_ENV === 'development') {
        const comp = require(`@/pages/${componentName}.vue`);
        return comp.default || comp;
    }

    return () => import(/* webpackChunkName: "view-[request]-[index]" */ `@/pages/${componentName}.vue`);
};

// 公共路由 Path 常量
export enum CommonUrls {
    Root = '/',
    Home = '/home',
    Login = '/login',
    Forbidden = '/403',
    NotFound = '/404'
}

// 导航路由处理
export const getItemPath = (baseUrl: string, ...paths: string[]) =>
    paths.reduce((total, current) => (total += `${current}`), baseUrl);
