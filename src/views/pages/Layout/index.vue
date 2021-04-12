<template>
    <div id="app">
        <el-container class="operation-management-container">
            <el-aside width="200px">
                <div data-v-77083b56="" class="aside-logo-container">
                    <img
                        data-v-77083b56=""
                        width="75"
                        src="data:image/png;base64,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"
                    />
                </div>
                <aside-meun></aside-meun>
            </el-aside>
            <el-main>
                <el-header><header-common></header-common></el-header>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import HeaderCommon from '@/views/common/header-common.vue';
import AsideMeun from '@/views/common/aside-menu/index.vue';

@Component({
    components: {
        HeaderCommon,
        AsideMeun
    }
})
export default class App extends Vue {}
</script>

<style lang="less">
html,
body {
    padding: 0;
    margin: 0;
    height: 100%;
    font-size: 100px;
}

body {
    font-size: 14px;
}

@media screen and (max-width: 1441px) {
    html {
        font-size: 66px;
    }
}

@media screen and (min-width: 1440px) and (max-width: 1921px) {
    html {
        font-size: 75px;
    }
}

@media screen and (min-width: 1920px) and (max-width: 2561px) {
    html {
        font-size: 100px;
    }
}

@media screen and (min-width: 2560px) and (max-width: 3841px) {
    html {
        font-size: 133px;
    }
}

@media screen and (min-width: 3840px) {
    html {
        font-size: 200px;
    }
}

#app {
    font-family: 'PingFangSC-Regular', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
        '微软雅黑', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 14px;
    color: #333;
    height: 100%;
    min-width: 1280px;
    font-weight: normal;
}

input::-webkit-credentials-auto-fill-button {
    display: none !important;
    visibility: hidden;
    pointer-events: none;
    position: absolute;
    right: 0;
}

input:focus::-webkit-contacts-auto-fill-button {
    opacity: 0;
}

::-webkit-input-placeholder {
    color: #999 !important;
}

.aside-logo-container {
    height: 112px;
    line-height: 112px;
    background: inherit;
    color: #f3f6ff;
    font-size: 13px;
    font-weight: bold;
    text-align: center;
}

.el-container {
    height: inherit;
}

.el-aside {
    background-color: rgb(26, 36, 77);
}

.el-main {
    background-color: #f6f8fa;
}
</style>
