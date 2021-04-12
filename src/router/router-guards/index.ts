/**
 * @file 导航守卫
 */
import { NavigationGuard } from 'vue-router';
import { GetLoginCheckNextStep, GetRoleCheckNextStep, NextSteps } from './types';
import store from '@/store/index';
import { Message } from 'element-ui';
import { ROOT_LOGOUT_MUTATION } from '@/store/root-store/store-types';
import { CommonUrls } from '@/utils';

// 验证登录状态
const getLoginCheckNextStep: GetLoginCheckNextStep = (toPath) => {
    const isLogin = store.getters.isLogin();
    switch (toPath.toLowerCase()) {
        case CommonUrls.Login: {
            return isLogin ? NextSteps.Home : NextSteps.Next;
        }
        default: {
            return isLogin ? NextSteps.Next : NextSteps.Login;
        }
    }
};

// 验证权限
const getRoleCheckNextStep: GetRoleCheckNextStep = (toPath, fromPath, next) => {
    // 以这些 url 卡头的路径不需要验证权限
    const isNoCheckPath = [CommonUrls.Login, CommonUrls.Home, CommonUrls.NotFound].some((path) =>
        toPath.toLowerCase().startsWith(path)
    );
    if (isNoCheckPath) {
        return NextSteps.Next;
    }
    // 拦截
    const grantedResouse = JSON.parse(store.getters.getGrantedResouse());
    const hasAuth = grantedResouse.some((item: any) => toPath.toLowerCase().endsWith(item.resourceUrl));
    if (!hasAuth) {
        // 当根节点halfChecked但子节点有选中的菜单时，默认跳转到当前该业务中心返回的第一个页面里
        if (toPath.toLowerCase().startsWith('/')) {
            const redirectItem = grantedResouse.find((item: any) => item.resourceUrl.toLowerCase().startsWith(toPath));
            if (redirectItem) {
                next(redirectItem.resourceUrl);
                return NextSteps.Next;
            }
            return NextSteps.Stay;
        }
        return NextSteps.Stay;
    } else {
        // 当从home页跳转若为系统根节点(根节点状态为checked)，跳转到首个有权限页面
        if (toPath === '/') {
            const redirectItem = grantedResouse.find((item: any) =>
                item.resourceUrl.toLowerCase().startsWith(toPath + '/')
            );
            next(redirectItem.resourceUrl);
        }

        return NextSteps.Next;
    }
};

// 全局前置导航
const beforeEachCallback: NavigationGuard = (to, from, next) => {
    // // 验证登录状态
    // const loginNextStep = getLoginCheckNextStep(to.path);
    // if (loginNextStep === NextSteps.Login) {
    //     // 从根目录过来时不提示
    //     if (![CommonUrls.Root as string, CommonUrls.Login as string].includes(from.path)) {
    //         Message.error('登录信息失效，请重新登录');
    //     }
    //     store.commit(ROOT_LOGOUT_MUTATION);
    //     next(CommonUrls.Login);
    //     return;
    // }
    // if (loginNextStep === NextSteps.Stay) {
    //     next(false);
    //     return;
    // }
    // if (loginNextStep === NextSteps.Home) {
    //     next(CommonUrls.Home);
    //     return;
    // }
    // // 验证权限
    // const roleNextStep = getRoleCheckNextStep(to.path, from.path, next);
    // if (roleNextStep === NextSteps.Home) {
    //     Message.error('您没有该中心的访问权限，如有需要请与管理员联系');
    //     next(CommonUrls.Home);
    //     return;
    // } else if (roleNextStep === NextSteps.Stay) {
    //     Message.error('您没有该模块的访问权限，如有需要请与管理员联系');
    //     next(false);
    //     return;
    // }
    next();
};

const beforeResolveCallback: NavigationGuard = (to, from, next) => {
    next();
};

const afterEachCallback: NavigationGuard = (to, from, next) => {
    next();
};

export { beforeEachCallback, beforeResolveCallback, afterEachCallback };