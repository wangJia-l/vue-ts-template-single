<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script lang="ts">
import {Vue} from 'vue-property-decorator';
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
