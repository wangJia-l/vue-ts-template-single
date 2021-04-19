<template>
    <div class="login-container">
        <div class="login-left">
            <div class="logo-container"><img src="~@/static/images/image-logo.png" alt="logo" /></div>
        </div>
        <div class="login-right">
            <div class="login-right-content">
                <div class="login-title">
                    <p>欢迎登录</p>
                    <p>设备运维管理系统</p>
                </div>
                <el-form
                    ref="loginForm"
                    class="login-form"
                    label-position="top"
                    :model="loginInfo"
                    :rules="formRules"
                    :hide-required-asterisk="true"
                >
                    <el-form-item
                        ref="usernameInput"
                        prop="username"
                        label="用户名称"
                        class="login-form-item username-form-item"
                    >
                        <el-input
                            v-model="loginInfo.username"
                            placeholder="请输入用户名"
                            :validate-event="false"
                            @input="onInput('username')"
                            @mouseenter.native="usernameClearIconVisible = true"
                            @mouseleave.native="usernameClearIconVisible = false"
                            @focus="isUsernameFocus = true"
                            @blur="isUsernameFocus = false"
                        >
                            <i
                                v-if="usernameClearIconVisible"
                                slot="suffix"
                                class="clear-icon-button"
                                @click="onResetForm('username')"
                            ></i>
                            <i v-else slot="suffix" class="username-icon"></i>
                        </el-input>
                        <div class="border" :class="isUsernameFocus ? 'show-border' : ''"></div>
                    </el-form-item>
                    <el-form-item
                        ref="passwordInput"
                        prop="password"
                        label="账号密码"
                        class="login-form-item"
                        :error="passwordWrongMsg"
                    >
                        <el-input
                            v-model="loginInfo.password"
                            type="password"
                            placeholder="请输入账号密码"
                            :validate-event="false"
                            show-password
                            @input="onInput('password')"
                            @keyup.enter.native="loginHandler"
                            @mouseenter.native="passwordClearIconVisible = true"
                            @mouseleave.native="passwordClearIconVisible = false"
                            @focus="isPasswordFocus = true"
                            @blur="isPasswordFocus = false"
                        ></el-input>
                        <div class="border" :class="isPasswordFocus ? 'show-border' : ''"></div>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login-button" type="primary" @click="loginHandler">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!-- 修改密码 -->
        <change-password :visible.sync="changePwdDialogVisible" />
    </div>
</template>

<script lang="ts">
import {Component, Vue, Ref} from 'vue-property-decorator';
import {Action} from 'vuex-class';
import {ROOT_LOGIN_ACTION} from '@/store/root-store/store-types';
import {ElForm} from 'element-ui/types/form';
import {validateELForm} from '@/utils';
import {RootLoginResponseProcessed} from '@/store/root-store/interface-types';
import {ElFormItem} from 'element-ui/types/form-item';
import ChangePassword from '@/components/common/changePassword.vue';

const crypto = require('crypto');

@Component({
    components: {
        ChangePassword
    }
})
export default class Login extends Vue {
    @Ref() readonly loginForm!: ElForm;
    @Ref() readonly usernameInput!: ElFormItem;
    @Ref() readonly passwordInput!: ElFormItem;

    @Action(ROOT_LOGIN_ACTION)
    login!: (payload: {
        username: string;
        password: string;
        clientId: string;
        grantType: string;
    }) => Promise<RootLoginResponseProcessed>;

    // 用户为初始状态：2时，修改密码的dialog弹框显示状态
    changePwdDialogVisible: boolean = false;

    // 没有用 el-input 提供的 show-password 和 clearable，是因为图标与 UI 提供的不同，并且希望类型图标和清除图标交替展示
    usernameClearIconVisible = false;
    passwordClearIconVisible = false;

    // 当密码错误时，在表格下方展示错误信息
    passwordWrongMsg = '';

    loginInfo = {
        username: '',
        password: '',
        clientId: 'frontend',
        grantType: 'password'
    };

    isUsernameFocus = false;
    isPasswordFocus = false;

    formRules = {
        username: [{required: true, message: '请您输入用户名'}],
        password: [{required: true, message: '请您输入账号密码'}]
    };

    async loginHandler() {
        // 验证表单项
        const isFormValid = await validateELForm(this.loginForm);
        if (isFormValid) {
            // 清空密码错误的验证信息
            this.passwordWrongMsg = '';
            // md5加密
            const md5 = crypto.createHash('md5');
            md5.update(this.loginInfo.password);
            let md5password = md5.digest('hex');
            // 登录
            const {isLoginSuccess, msg, userStatus} = await this.login(
                Object.assign({...this.loginInfo}, {password: md5password})
            );
            if (isLoginSuccess) {
                // 当前用户为初始状态时修改密码
                if (userStatus === 2) {
                    this.changePwdDialogVisible = true;
                } else {
                    this.$message({
                        type: 'success',
                        message: '登录成功',
                        duration: 1000,
                        onClose: () => {
                            this.$router.push('/device-operation/menu1/menu2').catch(() => {});
                        }
                    });
                }
            } else {
                this.passwordWrongMsg = msg;
            }
        }
    }

    onResetForm(key: 'username' | 'password') {
        this.loginInfo[key] = '';
    }

    onInput(key: 'username' | 'password') {
        if (key === 'username') {
            this.usernameInput.clearValidate();
        } else {
            this.passwordInput.clearValidate();
        }
    }
}
</script>

<style scoped lang="less">
.login-container {
    height: 100%;
    min-height: 766px;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;

    .login-left {
        flex: 1 1 60.4%;
        background: #0a6cef url('~@/static/images/background-login.png') left center no-repeat;
        background-size: cover;

        .logo-container {
            margin: 2.96vh 0 0 2.5vw;
            width: 10.42vw;

            img {
                width: 100%;
                vertical-align: middle;
            }
        }
    }

    .login-right {
        flex: 1 1 39.6%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333;

        .login-right-content {
            width: 23.96vw;
        }

        .login-title {
            font-size: 0.34rem;
            line-height: 1.4;
        }

        .login-form {
            margin-top: 12.59vh;
            overflow-y: hidden;

            .el-form-item {
                margin-bottom: 0;

                &.username-form-item {
                    margin-bottom: 5vh;
                }

                &.login-form-item {
                    /deep/ .el-form-item__label {
                        font-size: 0.14rem;
                        line-height: 1;
                        padding: 0;
                    }

                    /deep/ .el-form-item__content {
                        line-height: 1;
                        position: relative;

                        .border {
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 1px;
                            transform: translate(-100%, 0);
                            background: #888;
                            transition: transform 0.2s ease-in;
                            z-index: 1;
                        }

                        .show-border {
                            transform: translate(0, 0);
                        }

                        .el-input__inner {
                            padding: 14px 0;
                            height: auto;
                            background: none;
                            border-radius: 0;
                            border: none;
                            border-bottom: 1px solid #ccc;
                            color: #333;
                            font-size: 0.14rem;
                            line-height: 1;

                            &:-webkit-autofill {
                                -webkit-text-fill-color: #333 !important;
                                transition: background-color 5000s ease-in-out 0s;
                            }
                        }

                        .el-input__suffix {
                            height: auto;
                            padding: 14px 0;

                            .el-input__suffix-inner {
                                .username-icon {
                                    display: inline-block;
                                    width: 12px;
                                    height: 14px;
                                    background: url('~@/assets/icons/icon-login-username.png') no-repeat center center;
                                    background-size: contain;
                                }

                                .clear-icon-button {
                                    display: inline-block;
                                    width: 10px;
                                    height: 10px;
                                    background: url('~@/assets/icons/icon-login-clear.png') no-repeat center center;
                                    background-size: contain;
                                    .nice-btn();
                                }

                                .password-icon {
                                    display: inline-block;
                                    width: 14px;
                                    height: 10px;
                                    background: url('~@/assets/icons/icon-login-password.png') no-repeat center center;
                                    background-size: contain;
                                }
                            }
                        }

                        .el-form-item__error {
                            width: 100%;
                            margin-top: -1px;
                            padding-top: 0.08rem;
                            font-size: 0.14rem;
                            border-top: 1px solid #ef5551;
                            color: #ef5551;
                            z-index: 2;
                        }
                    }
                }
            }
        }

        .login-button {
            width: 6.25vw;
            margin-top: 6.67vh;
            background: #006aff;
            border: none;
            border-radius: 0;
            font-size: 0.14rem;
            transition: background 0.2s linear;

            &:hover {
                background: #38f;
            }

            &:active {
                background: #05c;
            }
        }
    }
}
</style>
