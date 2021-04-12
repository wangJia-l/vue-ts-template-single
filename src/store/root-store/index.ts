/**
 * 在 index 中定义 store 的具体实现
 * 在 interface-types 定义 store 中相关实现的 TypeScript 类型接口
 * 在 store-types 定义 store 中使用的 Mutation/Action Type 常量
 */
import {
    RootState,
    RootGetters,
    RootMutations,
    RootActions,
    RootLoginResponse,
    RootChangePwdResponseProcessed
} from '@/store/root-store/interface-types';
import {
    ROOT_UPDATE_USER_INFO_MUTATION,
    ROOT_LOGIN_URL,
    ROOT_LOGIN_ACTION,
    ROOT_LOGOUT_URL,
    ROOT_LOGOUT_MUTATION,
    ROOT_LOGOUT_ACTION,
    ROOT_SYSTEM_TIME_ACTION,
    ROOT_SYSTEM_TIME_URL,
    FETCH_OTE_TOKEN_URL,
    FETCH_OTE_TOKEN_ACTION,
    ROOT_CHANGE_OWN_PASSWORD_URL,
    ROOT_CHANGE_OWN_PASSWORD_ACTION
} from '@/store/root-store/store-types';
import {request} from '@/utils';

const state: RootState = {
    token: window.localStorage.getItem('v2xToken') || '',
    username: window.localStorage.getItem('v2xUsername') || '',
    role: window.localStorage.getItem('v2xRole') || '',
    grantedResouse: []
};

const getters: RootGetters = {
    isLogin: () => () => {
        const token = window.localStorage.getItem('v2xToken');
        return !!token;
    },
    isAdmin: () => () => {
        const role = window.localStorage.getItem('v2xRole');
        return role === 'admin';
    },
    getGrantedResouse: (state) => () => {
        const grantedResouse = window.localStorage.getItem('v2xGrantedResouse');
        return grantedResouse;
    }
};

const mutations: RootMutations = {
    // 更新用户信息
    [ROOT_UPDATE_USER_INFO_MUTATION](state, {token, username, role, grantedResouse}) {
        state.token = token || state.token;
        state.username = username || state.username;
        state.role = role ? role.toLocaleLowerCase() : state.role;
        state.grantedResouse = grantedResouse || state.grantedResouse;
        window.localStorage.setItem(
            'v2xToken',
            state.token.startsWith('Bearer ') ? state.token : 'Bearer ' + state.token
        );
        window.localStorage.setItem('v2xUsername', state.username);
        window.localStorage.setItem('v2xRole', state.role);
        window.localStorage.setItem('v2xGrantedResouse', JSON.stringify(state.grantedResouse));
    },
    // 退出登录
    [ROOT_LOGOUT_MUTATION](state) {
        state.token = '';
        state.username = '';
        state.role = '';
        state.grantedResouse = [];
        window.localStorage.removeItem('v2xToken');
        window.localStorage.removeItem('v2xUsername');
        window.localStorage.removeItem('v2xRole');
        window.localStorage.removeItem('v2xGrantedResouse');
    }
};

const actions: RootActions = {
    // 登录
    async [ROOT_LOGIN_ACTION]({commit}, {username, password, clientId, grantType}) {
        const {code, data, msg} = await request.post<RootLoginResponse>(ROOT_LOGIN_URL, {
            username,
            password,
            clientId,
            grantType
        });
        if (+code === 0 && data) {
            const {accessToken = '', userInfo, hasResources} = data;
            commit(ROOT_UPDATE_USER_INFO_MUTATION, {
                token: accessToken,
                username: userInfo.username,
                role: '',
                grantedResouse: hasResources
            });
        }
        return {
            isLoginSuccess: +code === 0,
            msg: msg ? msg : '账号或密码错误，请重新输入',
            userStatus: data ? data.userInfo.status : 0
        };
    },
    // 退出登录
    async [ROOT_LOGOUT_ACTION]({commit}) {
        // 退出不再走后端
        // const {code} = await request.post<{}>(ROOT_LOGOUT_URL);
        const code = 0;
        if (+code === 0) {
            commit(ROOT_LOGOUT_MUTATION);
        }
        return +code === 0;
    },
    // 获取系统时间
    async [ROOT_SYSTEM_TIME_ACTION]({commit}, noErrorHint = true) {
        const {data, code} = await request.get<{time: number}>(ROOT_SYSTEM_TIME_URL, undefined, {
            extraInfo: {noGlobalLoading: true, noErrorHint}
        });
        if (+code === 0 && data) {
            const {time} = data;
            return +time;
        }
        return -1;
    },
    // 获取登陆 OTE Token
    async [FETCH_OTE_TOKEN_ACTION]() {
        const {data, code} = await request.get<string>(FETCH_OTE_TOKEN_URL, undefined, {
            extraInfo: {noGlobalLoading: true}
        });
        if (+code === 0 && data) {
            return data;
        }
        return '';
    },
    // 用户修改自己的密码
    async [ROOT_CHANGE_OWN_PASSWORD_ACTION]({commit}, {oldPassword, newPassword}) {
        const {code, msg} = await request.post<any>(ROOT_CHANGE_OWN_PASSWORD_URL, {
            oldPassword,
            newPassword
        });
        return {
            code: +code,
            msg: msg ? msg : '密码修改失败'
        };
    }
};

export default {state, getters, mutations, actions};
