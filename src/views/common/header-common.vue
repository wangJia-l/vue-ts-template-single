<template>
    <div class="header-common-container">
        <div class="right-box">
            <robo-system-dropdown />
        </div>
    </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
@Component
export default class HeaderCommon extends Vue {}
</script>

<style lang="less">
.header-common-container {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    align-items: center;
}
</style>
