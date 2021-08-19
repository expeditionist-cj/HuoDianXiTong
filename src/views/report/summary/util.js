
import "moment/locale/zh-cn";



export let optMonth = [
    {
        label: "全部",
        value: 0,
        disabled: false
    },
    {
        label: "一月份",
        value: 1
    },
    {
        label: "二月份",
        value: 2
    },
    {
        label: "三月份",
        value: 3
    },
    {
        label: "四月份",
        value: 4
    },
    {
        label: "五月份",
        value: 5
    },
    {
        label: "六月份",
        value: 6
    },
    {
        label: "七月份",
        value: 7
    },
    {
        label: "八月份",
        value: 8
    },
    {
        label: "九月份",
        value: 9
    },
    {
        label: "十月份",
        value: 10
    },
    {
        label: "十一月份",
        value: 11,
    },
    {
        label: "十二月份",
        value: 12,
    }
]

export let optDevice = [
    {
        label: "脱硫",
        value: "tlsys_code"
    },
    {
        label: "脱硝",
        value: "txsys_code"
    }
]

//判断某一行是否有数据
export const hasNoTLData = (data)=>{
    //计数器
    let num = 0;
    for (var key in data) {
        //排除区域电厂、日期和id字段
        if (key == "val#1" || key == "val#2" || key == "date" || key == "date#1" || key == "date#2") {
            continue;
        } else if (data[key] != null) {
            //遍历该行所有字段是否为null，不为null则计数器加1
            num++;
        }
    }
    return num;
}