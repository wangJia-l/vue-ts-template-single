export interface MenuItem {
    path: string;
    title: string;
    icon?: string;
    children?: MenuItem[];
    isOldPath?: boolean;
}

export interface MenuConfig {
    path: string;
    title: string;
    icon?: string;
    children?: MenuItem[];
    isOldPath?: boolean;
}
