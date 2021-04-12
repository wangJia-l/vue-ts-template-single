/**
 * @file 日期、时间相关格式化参数，采用了 date-fns 作为工具
 * https://date-fns.org/docs/Getting-Started
 */
import {
    format,
    differenceInSeconds,
    startOfToday,
    startOfDay,
    getMinutes,
    getHours,
    isToday,
    subDays,
    subMinutes,
    subHours
} from 'date-fns';

// 时间格式化
export const formatTimeHelper = (date: Date | number, formatStr = 'yyyy-MM-dd HH:mm:ss'): string => {
    return format(date, formatStr);
};

// 日期差（秒）
export const differenceInSecondsHelper = (laterDate: Date, earlierDate = new Date()): number => {
    return differenceInSeconds(laterDate, earlierDate);
};

// 获得一天的开始时刻
export const startOfDayHelper = (date = new Date()) => startOfDay(date);

// 获得给定时刻的分钟数
export const getMinutesHelper = (date: Date | number) => getMinutes(date);

// 获得给定时刻的小时数
export const getHoursHelper = (date: Date | number) => getHours(date);

// 是否为当天
export const isTodayHelper = (date: Date | number) => isToday(date);

// 获取距离当前时刻N天日期时间
export const getSubDays = (date: Date | number, amount: number) => subDays(date, amount);

// 分钟数转化为几小时零几分钟
export const getHoursAndMin = (amount: number) => {
    return Math.floor(amount / 60) + '小时' + Math.round(amount % 60) + '分钟';
};

// 获取当前时间之前N分钟的时间
export const getSubMinutes = (date: Date | number, amount: number) => subMinutes(date, amount);

// 获取当前时间之前N小时的时间
export const getSubHours = (date: Date | number, amount: number) => subHours(date, amount);
