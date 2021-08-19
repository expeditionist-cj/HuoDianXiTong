import _ from "lodash";
import moment from "moment";
// 判断对象的值是否为空
export const hasValue = (obj) => {
    let values = Object.values(obj);
    let values_str = values.join("");
    if (!values_str) {
        return true
    }
    return false;
}
// 判断当前月有哪些天数有数据
export const hasDays = (data, att) => {
    data = JSON.parse(JSON.stringify(data));
    let arry = [];
    data.pop();
    data.pop();
    data.forEach(item => {
        let day = item[att];
        delete item[att];
        if (!hasValue(item)) {
            arry.push(day)
        }
    });
    return arry;
}
// 构造个以当前天数的数组
export const create_month_arry = (time) => {
    let num = moment(time).daysInMonth();
    let arry = [];
    for (let index = 0; index < num; index++) {
        arry.push(index + 1);
    };
    return arry
}
// 判断以当前天为界限，哪些天没有数据
export const hasNoDataDays = (data, att, time, day) => {
    // 判断当月哪些天说数据
    let arry = hasDays(data, att);
    arry=arry.map((item)=>{
        return parseInt(item);
    })
    let arry1 = create_month_arry(time);
    day = moment().format("D"); // 判断当前的day
    let month = moment().format("MM");// 判断当前的月份
    let year = moment().format("YYYY");// 判断当前的年份 

    // 如果是当月新增，则过滤掉当天之后的day
    if (new Date(year+"-"+month) - new Date(time)==0) {
        // 过滤掉当天之后的天数
        arry1 = arry1.filter(item => {
            return item <= day
        });
    }

    // 计算出没有添加的天数
    return _.xor(arry, arry1);
}


