/**
 * @file 导航守卫
 */
import {NavigationGuard} from 'vue-router';
import {GetLoginCheckNextStep, GetRoleCheckNextStep, NextSteps} from './types';
import {CommonUrls} from '@/utils';

// 验证登录状态
const getLoginCheckNextStep: GetLoginCheckNextStep = (toPath) => {
    const isLogin = true;
    switch (toPath.toLowerCase()) {
        case CommonUrls.Login: {
            return NextSteps.Home;
        }
        default: {
            return isLogin ? NextSteps.Next : NextSteps.Login;
        }
    }
};

// 全局前置导航
const beforeEachCallback: NavigationGuard = async (to, from, next) => {
    // 验证登录状态
    const loginNextStep = getLoginCheckNextStep(to.path);
    if (loginNextStep === NextSteps.Home) {
        next(CommonUrls.Home);
        return;
    }

    // 登陆和权限均通过验证
    next();
};

const beforeResolveCallback: NavigationGuard = (to, from, next) => {
    next();
};

const afterEachCallback: NavigationGuard = (to, from, next) => {
    next();
};

export {beforeEachCallback, beforeResolveCallback, afterEachCallback};
