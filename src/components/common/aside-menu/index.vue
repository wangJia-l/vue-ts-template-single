<template>
    <el-menu
        class="operation-management-aside-menu"
        :collapse-transition="false"
        :default-active="filterRouterActive()"
        :unique-opened="true"
        :router="true"
        background-color="#1a244d"
        text-color="#E6EDFF"
        active-text-color="#ffffff"
    >
        <template v-for="menu in menus">
            <!-- 有子菜单 -->
            <template v-if="menu.children && menu.children.length > 0">
                <el-submenu :key="getItemPath(menu.path)" :index="getItemPath(menu.path)">
                    <template slot="title">
                        <i class="submenu-icon" :class="`submenu-icon-${menu.icon}`"></i>
                        <span slot="title">{{ menu.title }}</span>
                    </template>
                    <el-menu-item
                        v-for="item in menu.children"
                        :key="getItemPath(menu.path, item.path)"
                        :index="getItemPath(menu.path, item.path)"
                        style="padding-left: 48px;"
                        @click="initLeftMenu(item)"
                    >
                        <i v-if="item.icon" class="item-icon" :class="`item-icon-${item.icon}`" />
                        <span>{{ item.title }}</span>
                    </el-menu-item>
                </el-submenu>
            </template>
            <!-- 没有子菜单 -->
            <template v-else>
                <el-menu-item :key="getItemPath(menu.path)" :index="getItemPath(menu.path)">
                    <i class="submenu-icon" :class="`submenu-icon-${menu.icon}`"></i>
                    <span class="menu-text">{{ menu.title }}</span>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import menuConfig from './config';
import {MenuConfig} from './types';
import {CommonUrls, getItemPath} from '@/utils';
import {Getter} from 'vuex-class';

const DEFAULT_ICON: string = 'el-icon-setting';

@Component
export default class Menu extends Vue {
    @Getter getGrantedResouse!: () => string;

    menus: MenuConfig[] = menuConfig;
    filteredMenus: MenuConfig[] = []; // 过滤后有权限的menu

    getItemPath(...paths: string[]) {
        return getItemPath('', ...paths);
    }

    /**
     * 递归过滤配置的静态菜单选项，返回符合用户角色权限的菜单
     * @param menus 配置静态的菜单
     */
    filterUserAuthMenu(menus: any[]) {
        const grantedResouse = JSON.parse(this.getGrantedResouse());
        const accessedMenus = menus.filter((menu) => {
            if (this.hasPermission(menu, grantedResouse)) {
                if (menu.children && menu.children.length) {
                    menu.children = this.filterUserAuthMenu(menu.children);
                }
                return true;
            } else {
                return false;
            }
        });
        return accessedMenus;
    }
    filterRouterActive(key?: string): string {
        const currentRoute = this.$route.path.substr(0, this.$route.path.indexOf('lists') + 5);
        return this.$route.path.includes('lists') ? currentRoute : this.$route.path;
    }
    /**
     * 判断是否有权限
     * @param menu 当前菜单
     * @param grantedResouse 全量的权限资源（优化空间：只拿到当前中心的权限）
     * */
    hasPermission(menu: MenuConfig, grantedResouse: any[]) {
        if (menu.title) {
            return grantedResouse.some((item: any) => {
                return menu.title === item.resourceName;
            });
        }
    }

    initLeftMenu(item: any) {
        this.$router.push({
            name: item.name
        });
    }

    async mounted() {
        // 只展示用户拥有权限的菜单：使用filteredMenus替代配置的静态菜单menus
        // this.filteredMenus = await this.filterUserAuthMenu(this.menus);
    }
}
</script>

<style lang="less">
@buttonWidth: 50px;

.operation-management-aside-menu {
    text-align: left;

    &.el-menu {
        border-right: none;

        .submenu-icon,
        .item-icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 15px;
        }

        .submenu-icon {
            &.submenu-icon-system {
                background: url('~@/assets/icons/operation-nav/icon-system.png') no-repeat center center;
                background-size: contain;
            }

            &.submenu-icon-basic {
                background: url('~@/assets/icons/operation-nav/icon-basic.png') no-repeat center center;
                background-size: contain;
            }
        }

        .el-menu-item:hover .submenu-icon,
        .el-submenu:hover .submenu-icon {
            &.submenu-icon-system {
                background: url('~@/assets/icons/operation-nav/icon-system-hover.png') no-repeat center center;
                background-size: contain;
            }

            &.submenu-icon-basic {
                background: url('~@/assets/icons/operation-nav/icon-basic-hover.png') no-repeat center center;
                background-size: contain;
            }
        }

        .el-menu-item {
            height: 56px;
            line-height: 56px;
            border-left: 3px solid transparent !important;

            &.is-active {
                border-left: 3px solid #006aff !important;
                background-color: rgb(21, 29, 62) !important;
                color: #fff !important;
            }
        }

        .el-submenu {
            &.is-active {
                .el-submenu__title {
                    color: #fff !important;
                }
            }
        }
    }
}
</style>
