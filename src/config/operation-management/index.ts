// 公共的配置模块
import {SelectOption, TypeSelectOption} from './types';
// 设备管理相关的公共配置

// 联网状态
export const networkingOptions: SelectOption[] = [
    {
        value: 999,
        label: '全部'
    },
    {
        value: 0,
        label: '在线'
    },
    {
        value: 1,
        label: '离线'
    }
];

// 用途
export const usagesOptions: SelectOption[] = [
    {
        value: 999,
        label: '全部'
    },
    {
        value: 0,
        label: '测试'
    },
    {
        value: 1,
        label: '交付'
    }
];

// 运营状态
export const maintainOptions: SelectOption[] = [
    {
        value: 999,
        label: '全部'
    },
    {
        value: 0,
        label: '正常'
    },
    {
        value: 1,
        label: '故障'
    },
    {
        value: 2,
        label: '维修中'
    },
    {
        value: 3,
        label: '已报废'
    }
];

// 道路类型
export const roadTypeOptions: SelectOption[] = [
    {
        value: 999,
        label: '全部'
    },
    {
        value: 10,
        label: '城市道路'
    },
    {
        value: 11,
        label: '城市大桥'
    },
    {
        value: 12,
        label: '城市隧道'
    },
    {
        value: 20,
        label: '高速公路'
    },
    {
        value: 21,
        label: '高速大桥'
    },
    {
        value: 22,
        label: '高速隧道'
    }
];

// rsu供应商 deviceType 表示对应设备的设备型号
export const RsuDeviceAndTypeOptions: TypeSelectOption[] = [
    {
        value: 999,
        label: '全部',
        deviceType: []
    },
    {
        value: 0,
        label: '星云互联',
        deviceType: [{value: 0, label: 'CWAVE-MTFBWY-RCI'}]
    },
    {
        value: 1,
        label: '千方科技',
        deviceType: [{value: 1, label: 'QF-VX1000'}]
    },
    {
        value: 2,
        label: 'CIDI希迪智驾',
        deviceType: [{value: 2, label: 'CIDI 2.0'}]
    }
];

// 连接类型
export const accessTypeListOptions: SelectOption[] = [
    {
        value: '',
        label: '全部'
    },
    {
        value: 0,
        label: 'RSCU接入'
    },
    {
        value: 1,
        label: '云云接入'
    },
    {
        value: 2,
        label: '直连接入'
    }
];

export const accessTypeHash: {[propsName: string]: string} = {
    0: 'RSCU接入',
    1: '云云接入',
    2: '直连接入'
};

// 建设厂商
export const constructSupplierListOptions: SelectOption[] = [
    {
        value: '',
        label: '全部'
    },
    {
        value: 0,
        label: '百度'
    },
    {
        value: 1,
        label: '莱斯'
    },
    {
        value: 2,
        label: '启迪云控 '
    }
];

export const constructSupplierHash: {[propsName: string]: string} = {
    0: '百度',
    1: '莱斯',
    2: '启迪云控'
};
