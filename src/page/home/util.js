import _ from "lodash";
import { areaMap, baseMap, map_map } from "../../dict/index";
// 循环出x轴数据
export const get_XY_data = (data) => {
    let { x, y } = { x: [], y: [] };
    x = Object.keys(data);
    y = Object.values(data);
    y = y.map(item=>{
        return item*1
    })
    return {
        x, y
    }
}
// 格式化雷达图数据
export const formatterRadarData = (data) => {
    if (!Object.keys(data).length) {
        return {
            indicator: [
                { text: "东北" },
                { text: "内蒙" },
                { text: "河南" },
                { text: "江西" },
                { text: "西北" }
            ],
            data: []
        }
    }
    let obj = {};
    _.forOwn(data, (value, key) => {
        obj[areaMap[key]] = value
    });
    let indicator = Object.keys(obj).map(item => {
        return {
            text: item
        }
    });

    return {
        indicator,
        data: Object.values(obj)
    }
}
// 格式化基础数据
export const formatterBase = (data) => {
    let arr = [];
    _.forOwn(data, (value, key) => {
        let obj = {};
        obj.name = baseMap[key];
        obj.value = value;
        arr.push(obj);
    });
    return arr
}
// 格式化地图数据
export const formatterMap_key = (data, key, k1) => {
    let obj = {};
    data.map(item => {
        obj[areaMap[item.region]] = {};
        obj[areaMap[item.region]][k1 || key] = item[key],
            obj[areaMap[item.region]].area = areaMap[item.region]
    });
    return obj
}