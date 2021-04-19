import {SelectOption} from './types';
import {CascaderOption} from 'element-ui/types/cascader-panel';
//系统管理 - 状态
export const TYPE_STATUS: {[propsName: string]: string} = {
    0: '已启用',
    1: '已禁用',
    2: '初始状态'
};

//系统管理- 角色
export const CLASSIFY_ROLE: SelectOption[] = [
    {
        value: 0,
        label: '普通用户'
    },
    {
        value: 1,
        label: '超级管理员'
    }
];

export const USER_ROLE: {[propsName: number]: string} = {
    0: '普通用户',
    1: '超级管理员'
};

//系统管理- 用户状态
export const USER_STATES: {[propsName: number]: string} = {
    0: '启用',
    1: '禁用',
    2: '初始状态'
};

//系统管理 - 筛状态选项的下拉选项
export const TYPE_OPTIONS: SelectOption[] = [
    {
        value: '',
        label: '全部'
    },
    {
        value: 0,
        label: '启用'
    },
    {
        value: 1,
        label: '禁用'
    },
    {
        value: 2,
        label: '初始状态'
    }
];

// 验证密码   密码设置涵盖小写字母、大写字母、数字、特殊字符（_ ^ ! @ $ & *) 6~12位
export const isvalidPass = function(str: string) {
    const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_^!@$&*])[A-Za-z\d_^!@$&*]{6,12}$/;
    return reg.test(str);
};
export const validatorObj = {
    passWord: '',
    confirmPass: '',
    //判断密码是否符合规则，两次密码是否一致
    isSubmit: false
};
export const validator = {
    validatePass: (rule: any, value: any, callback: any) => {
        validatorObj.passWord = value;
        if (value === '') {
            callback(new Error('请输入密码'));
            validatorObj.isSubmit = false;
        } else if (!isvalidPass(value)) {
            validatorObj.isSubmit = false;
            callback(new Error('长度6~12位必须包含大小写字母·数字·特殊字符^!@$&*_'));
        } else {
            callback();
        }
    },
    validateConfirmPass: (rule: any, value: any, callback: any) => {
        validatorObj.confirmPass = value;
        if (value === '') {
            validatorObj.isSubmit = false;
            callback(new Error('请输入密码'));
        } else if (value !== validatorObj.passWord) {
            validatorObj.isSubmit = false;
            callback(new Error('两次输入密码不一致！'));
        } else {
            validatorObj.isSubmit = true;
            callback();
        }
    },
    checkRealName: (rule: any, value: any, callback: any) => {
        if (!value) {
            callback(new Error('请输入姓名'));
        } else {
            const reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]{0,32}$/;
            if (!reg.test(value)) {
                callback(new Error('允许中文、英文、数字及下划线,最大字符长度32位'));
            } else {
                callback();
            }
        }
    },
    checkUserName: (rule: any, value: any, callback: any) => {
        if (!value) {
            callback(new Error('请输入账号'));
        } else {
            const reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[_])[A-Za-z\d_]{6,20}$/;
            if (!reg.test(value)) {
                callback(new Error('长度6~20位，必须包含数字、字母、下划线'));
            } else {
                callback();
            }
        }
    },
    validateResetPass: (rule: any, value: any, callback: any) => {
        if (!value) {
            callback();
        } else {
            const reg = /^[A-Za-z\d_^!@$&*]{6,20}$/;
            if (!reg.test(value)) {
                callback(new Error('长度6~20位由大小写字母·数字·特殊字符^!@$&*_组成'));
            } else {
                callback();
            }
        }
    },
    validatePhone: (rule: any, value: any, callback: any) => {
        if (!value) {
            callback(new Error('请输入手机号'));
        } else {
            const reg = /^1[34578]\d{9}$/;
            if (!reg.test(value)) {
                callback(new Error('手机号格式不正确，请重新输入'));
            } else {
                callback();
            }
        }
    },
    validateEmail: (rule: any, value: any, callback: any) => {
        if (!value) {
            callback(new Error('请输入邮箱'));
        } else {
            const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            if (!reg.test(value)) {
                callback(new Error('邮箱格式不正确，请重新输入'));
            } else if (value.length > 50) {
                callback(new Error('最长50位'));
            } else {
                callback();
            }
        }
    }
};
// 数据录入校验规则 新增、编辑、密码修改、操作日志试场景
export const authorityRules = {
    realName: [{required: true, trigger: 'change', validator: validator.checkRealName}],
    email: [{required: true, trigger: 'blur', validator: validator.validateEmail}],
    userName: [{required: true, trigger: 'blur', validator: validator.checkUserName}],
    phoneNumber: [{required: true, trigger: 'blur', validator: validator.validatePhone}],
    passWord: [{required: true, validator: validator.validateResetPass, trigger: 'blur'}]
    //, confirmPassword: [{required: true, validator: validator.validateConfirmPass, trigger: 'blur'}],
    // dateTimeRange: [{required: true, trigger: 'change', message: '请输入起始时间'}]
};

//系统管理-抽屉中的表头
export const editModeObj: {[propsName: number]: string} = {
    0: '新增用户',
    1: '编辑用户',
    2: '操作日志',
    3: '修改密码'
};

//系统管理-角色管理-抽屉中的表头
export const rolesDrawerTitle: {[propsName: number]: string} = {
    0: '新增角色',
    1: '编辑角色',
    2: '角色权限设置'
};

// 数据录入校验规则 新增、编辑、权限设置
export const rolesRules = {
    roleName: [{required: true, trigger: 'change', message: '请输入角色名称'}],
    roleInfo: [{required: true, trigger: 'change', message: '请输入角色描述'}]
};

// 数据录入校验规则 新增、编辑、权限设置
export const functionsRules = {
    resourceName: [{required: true, trigger: 'change', message: '请输入资源名称'}],
    resourceUrl: [{required: true, trigger: 'change', message: '请输入资源地址'}],
    resourceCode: [{required: true, trigger: 'change', message: '请输入资源编码'}],
    resourceType: [{required: true, trigger: 'change', message: '请选择资源类型'}]
};
