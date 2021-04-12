import {MenuConfig} from './types';

const menuConfigs: MenuConfig[] = [
    {
        path: '/home',
        icon: 'basic',
        title: '首页',
        children: [
            {
                path: '/home1',
                title: 'home1'
            },
            {
                path: '/home2',
                title: 'home2'
            }
        ]
    },
    {
        path: '/list',
        icon: 'system',
        title: '列表'
    }
];

export default menuConfigs;
