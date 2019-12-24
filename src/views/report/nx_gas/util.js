import moment from "moment";
import "moment/locale/zh-cn";
// 获取电厂下的机组
export const getUnit = (data)=>{
    let arry = data.map(item=>{
        return item.charAt(0);
    })
    let set = new Set(arry);
    return ([...set])
}

// 判断一个月有多少天
export const create_arry = (time)=>{
    let num = moment(time).daysInMonth();
    console.log(num)
    let arry = [];
    for (let index = 0; index < num; index++) {
        arry.push({
            day:index+1
        })
    };
    return arry
}
// 补全数据
export const completeData = (data,time)=>{
    let arry = create_arry(time);
    arry.forEach((item,idx) => {
        data.forEach(ele => {
            if(item.day == ele.day){
                arry[idx] = ele
            }
        });
    });
    return arry
}