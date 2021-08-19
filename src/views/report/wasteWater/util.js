import moment from "moment";
export let getDayOptions = (value) => {
    let days = moment(value).daysInMonth(); //获取当前选中月有多少天
    let currentMonth = moment(Date.now()).month();  //当前月
    let selectMonth = moment(value).month(); //选中月
    let currentDay = moment(Date.now()).date(); //当前日 
    let arry = [];
    arry.push({
        val: '',
        label: '全部'
    })
    // 如果选择的月是当前月，则只显示当前月1号到当前天的时间
    if (selectMonth == currentMonth) {
        for (var i = 1; i <= currentDay; i++) {
            arry.push({
                label: i > 9 ? i : '0' + i,
                val: i
            })
        }
    } else {
        // 否则显示选中月的所有天
        for (var i = 1; i <= days; i++) {
            arry.push({
                label: i > 9 ? i : '0' + i,
                val: i
            })
        }
    }
    return arry
}