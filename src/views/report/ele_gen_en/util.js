import { power_GNT } from "../../../dict/index"
import _ from "lodash";
const math_clm_width = (data) => {
    return data.length * 15;
}

// 渲染发电量统计表表头
export const rd_clm = (unitList, data) => {
    let arr = [];
    arr = unitList.map(item => {
        let obj = {};
        obj.label = item + "机组";
        let childArr = [];
        _.forOwn(power_GNT, (value, key) => {
            let childObj = {};
            childObj.label = value;
            childObj.prop = item + "_" + key;
            childObj['width'] = math_clm_width(value);
            childArr.push(childObj)
        });
        obj.children = childArr;
        return obj
    });
    arr.unshift({
        label: '日期',
        prop: 'day',
        fixed: true,
        width: 120

    })
    return arr
}