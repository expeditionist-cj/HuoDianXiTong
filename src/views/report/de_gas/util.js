import {DE_GAS} from "../../../dict/index"
import moment from "moment";
// 动态渲染table表头

// 判断一个月有多少天
export const create_arry = (time)=>{
    let num = moment(time).daysInMonth();
    let arry = [];
    for (let index = 0; index < num; index++) {
        arry.push({
            dy:index+1
        })
    };
    return arry
}
// 补全数据
export const completeData = (data,time)=>{
    let arry = create_arry(time);
    arry.forEach((item,idx) => {
        data.forEach(ele => {
            if(item.dy == ele.dy){
                arry[idx] = ele
            }
        });
    });
    return arry
}