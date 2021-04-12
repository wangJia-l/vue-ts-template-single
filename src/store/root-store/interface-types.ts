import {MutationTree, GetterTree, ActionTree, ActionContext} from 'vuex';
import {
    ROOT_UPDATE_USER_INFO_MUTATION,
    ROOT_LOGIN_ACTION,
    ROOT_LOGOUT_MUTATION,
    ROOT_LOGOUT_ACTION,
    ROOT_SYSTEM_TIME_ACTION,
    FETCH_OTE_TOKEN_ACTION,
    ROOT_CHANGE_OWN_PASSWORD_ACTION
} from '@/store/root-store/store-types';

export interface RootLoginResponse {
    accessToken: string;
    userInfo: any;
    hasResources: any;
}

export interface RootLoginResponseProcessed {
    isLoginSuccess: boolean;
    msg: string;
    userStatus: number;
}

export interface RootState {
    token: string;
    username: string;
    role: string;
    grantedResouse: any;
}

export interface RootChangePwdResponseProcessed {
    code: number;
    msg: string;
}

export const validator = {
    checkNewPwd: (rule: any, value: any, callback: any) => {
        if (!value) {
            callback(new Error('请输入新密码'));
        } else {
            const reg = /^\w\w{5,20}$/;
            if (!reg.test(value)) {
                callback(new Error('允许英文、数字,最短6位,最大字符长度20位'));
            } else {
                callback();
            }
        }
    }
};
// 数据录入校验规则 新增、编辑、权限设置
export const pwdRules = {
    oldPassword: [{required: true, trigger: 'change', message: '请输入旧密码'}],
    newPassword: [{required: true, trigger: 'change', validator: validator.checkNewPwd}]
};

export interface RootGetters extends GetterTree<RootState, RootState> {
    isLogin(): () => boolean;
    isAdmin(): () => boolean;
}

export interface RootMutations extends MutationTree<RootState> {
    [ROOT_UPDATE_USER_INFO_MUTATION](
        state: RootState,
        payload: {token: string; username: string; role: string; grantedResouse: any}
    ): void;
    [ROOT_LOGOUT_MUTATION](state: RootState): void;
}

export interface RootActions extends ActionTree<RootState, RootState> {
    [ROOT_LOGIN_ACTION](
        actionContext: ActionContext<RootState, RootState>,
        payload: {username: string; password: string; clientId: string; grantType: string}
    ): Promise<RootLoginResponseProcessed>;
    [ROOT_LOGOUT_ACTION](actionContext: ActionContext<RootState, RootState>): Promise<boolean>;
    [ROOT_SYSTEM_TIME_ACTION](
        actionContext: ActionContext<RootState, RootState>,
        noErrorHint: boolean
    ): Promise<number>;
    [FETCH_OTE_TOKEN_ACTION](actionContext: ActionContext<RootState, RootState>): Promise<string>;
    [ROOT_CHANGE_OWN_PASSWORD_ACTION](
        actionContext: ActionContext<RootState, RootState>,
        payload: {oldPassword: string; newPassword: string}
    ): Promise<RootChangePwdResponseProcessed>;
}
