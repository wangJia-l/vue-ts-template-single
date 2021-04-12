/**
 * @file WebSocket 相关辅助函数
 */
import {Message} from 'element-ui';

// 开发模式下引入 WS 的 Mock 函数
// process.env.NODE_ENV === 'development' && require('./mocker');

import {stringifyParams} from '@/utils';
import {WsConnectHelper} from './types';

// 根据当前页面网络协议，获取对应的 WS 协议
const _getWSUrl = (url: string, param: string) => {
    const {protocol, host} = window.location;
    const wsProtocol = protocol === 'https:' ? 'wss:' : 'ws:';
    return `${wsProtocol}//${host}${WS_BASE_URL}${url}?${param}`;
};

// 默认的 WS 连接前缀
export const WS_BASE_URL = process.env.VUE_APP_WS_BASE_URL;

// WS 链接路径
export const WS_URLS = {
    traffic: '/traffic',
    device: '/device',
    rscuFlow: '/deviceDetail', // RSCU 实时流量
    vehicle: '/vehicle', // 添加查询参数推送单车数据，不添加时推送全量数据
    perception: '/perception',
    signal: '/lamps',
    trafficLaneFlow: '/trafficLaneFlow' // 车道级流量
};

// WS 推送的主题（服务端确定）
export const WS_SERVER_TYPES = {
    // ------------ 交通 ------------
    trafficEvent: 'trafficEvent', // 交通事件

    // ------------ 设备 ------------
    deviceFaultStatistic: 'd0', // 今日故障统计
    overviewFaultTrend: 'd1', // 今日故障趋势
    overviewFaultDeviceTrend: 'd2', // 今日故障设备趋势
    deviceStatus: 'd3', // 设备状态（实时告警）
    deviceData: 'deviceData', // 设备实时流量
    rscuData: 'deviceDetailData', // RSCU 实时流量
    devoceOnlineRate: 'd4', // 设备在线率

    // ------------ 车辆概览 ------------
    vehiclesOverview: 'v0', // 概览数据
    vehiclesInMap: 'v1', // 车辆监控（地图展示）
    activeVehicles: 'v2', // 活跃车辆列表,
    activeVehicleState: 'v3', // 活跃车辆状态,
    movingVehiclesNum: 'v4', // 在驶车辆数

    // ------------ 单车监控 ------------
    singleVehicleDrivingData: 'v5', // 单车行驶数据
    singleVehicleTrafficEvents: 'v6', // 路侧感知交通事件
    singleVehiclePerceptionDrivingData: 'v7', // 路侧感知第三方车辆数据
    singleVehiclePerceptionVehicleData: 'v8', // 车侧感知第三方车辆数据（相关功能未实现，此主题未使用）
    singleVehicleSignalCrossRoad: 'v9' // 路侧感知信号灯路口
};

let errCount = 0;
const hintWsError = () => {
    if (errCount <= 0) {
        errCount += 1;
        Message.error({
            message: 'WebSocket连接建立失败，请刷新页面重试',
            onClose() {
                errCount -= 1;
            }
        });
    }
};

// 创建 WS 连接
export const wsConnectHelper: WsConnectHelper = (url, params) => {
    return new Promise((resolve) => {
        const token = window.localStorage.getItem('v2xToken') as string;
        const tokenObj = params ? Object.assign({}, params, {token}) : {token};
        const paramsUrl = stringifyParams(tokenObj);
        const fullUrl = WS_BASE_URL.startsWith('ws') ? `${WS_BASE_URL}${url}?${paramsUrl}` : _getWSUrl(url, paramsUrl);
        if (token) {
            const ws = new WebSocket(fullUrl);
            ws.onopen = () => {
                resolve(ws);
            };
            ws.onerror = () => {
                hintWsError();
            };
        }
    });
};

// 解析 WS 推送的数据
export const parseMessageEvent = (messageEvent: MessageEvent): any => {
    if (!messageEvent) {
        return null;
    }
    const {data} = messageEvent;

    if (!data || typeof data !== 'string' || ['fail', 'ok'].includes(data)) {
        if (messageEvent.data === 'fail') {
            hintWsError();
        }
        return null;
    }

    try {
        return JSON.parse(data);
    } catch (e) {
        console.error(e, 'ws 解析错误');
        return null;
    }
};
