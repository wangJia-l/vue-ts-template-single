<template>
    <div class="changePwd-container">
        <el-dialog
            title="当前登录用户为初始状态，建议修改密码！"
            :visible.sync="innerVisible"
            width="30%"
            top="12vh"
            custom-class="changePwd-dialog"
            :before-close="handleClose"
        >
            <el-form ref="insertDataForm" :key="innerVisible" :model="pwdForm" :rules="rules">
                <el-form-item label="老密码" prop="oldPassword">
                    <el-input v-model="pwdForm.oldPassword" autocomplete="off" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="pwdForm.newPassword" autocomplete="off" type="password" show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="handleSaveChange">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts">
// 使用了 dialog-visible-mixin 控制 dialog 的可见性
import {Component, Prop, Emit, Mixins, Watch, Ref} from 'vue-property-decorator';
import DialogVisibleMixin from '@/mixins/dialog-visible-mixin';
import {validateELForm} from '@/utils';
import {ElForm} from 'element-ui/types/form';
import {Action} from 'vuex-class';
import {ROOT_CHANGE_OWN_PASSWORD_ACTION} from '@/store/root-store/store-types';
import {RootChangePwdResponseProcessed, pwdRules} from '@/store/root-store/interface-types';

const crypto = require('crypto');
@Component
export default class ChangePassword extends Mixins(DialogVisibleMixin) {
    @Ref() readonly insertDataForm!: ElForm;
    @Action(ROOT_CHANGE_OWN_PASSWORD_ACTION) changeOwnPwd!: (payload: {
        oldPassword: string;
        newPassword: string;
    }) => Promise<RootChangePwdResponseProcessed>;
    // 数据录入校验规则
    get rules() {
        return pwdRules;
    }
    pwdForm = {
        oldPassword: '',
        newPassword: ''
    };

    // md5加密处理
    md5Encryption(payload: number | string) {
        return crypto
            .createHash('md5')
            .update(payload)
            .digest('hex');
    }

    async handleSaveChange() {
        const isFormValid = await validateELForm(this.insertDataForm);
        if (!isFormValid) {
            return;
        }
        const {code, msg} = await this.changeOwnPwd({
            oldPassword: this.md5Encryption(this.pwdForm.oldPassword),
            newPassword: this.md5Encryption(this.pwdForm.newPassword)
        });
        if (+code === 0) {
            this.$message({
                type: 'success',
                message: '修改成功',
                duration: 1000,
                onClose: () => {
                    this.$router.push('/home').catch(() => {});
                }
            });
        } else {
            this.$message.error(msg);
        }
        this.innerVisible = false;
    }

    handleClose() {
        this.innerVisible = false;
        window.localStorage.removeItem('v2xToken');
    }
}
</script>
<style lang="less">
.changePwd-dialog {
    min-width: 300px;
}
</style>
