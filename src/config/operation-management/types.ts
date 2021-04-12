// 公共的interface配置模块

// 设备管理相关的公共interface配置

export interface SelectOption {
    value: number | string;
    label: string;
}

export interface TypeSelectOption {
    value: number | string;
    label: string;
    deviceType: SelectOption[];
}

export interface SeletionRscuOption {
    id: number | string;
    sn: string;
}
