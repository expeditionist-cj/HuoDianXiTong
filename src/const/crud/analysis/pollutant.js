let dict = {
    yoy: "同期",
    mom: "上月"
}
export let transferPollutantData = (data, compareMethod) => {

    let tlKey = compareMethod + "_" + "outSo2Mnt"
    let txKey = compareMethod + "_" + "outNoxMnt"
    // 循环出x轴
    let xData = []
    let tlTq = []
    let tlBy = []
    let txTq = []
    let txBy = []
    let series = []
    data.forEach(ele => {
        xData.push(ele.dept_name)
        tlBy.push(ele.outSo2Mnt)
        txBy.push(ele.outNoxMnt)
        tlTq.push(ele[tlKey])
        txTq.push(ele[txKey])
    });
    // 循环出y轴
    series.push(
        {
            name: dict[compareMethod] + "脱硫",
            type: "bar",
            stack: dict[compareMethod],
            data: tlTq
        },
        {
            name: dict[compareMethod] + "脱硝",
            type: "bar",
            stack: dict[compareMethod],
            data: txTq
        },
        {
            name: "本月脱硫",
            type: "bar",
            stack: "本月",
            data: tlBy
        },
        {
            name: "本月脱硝",
            type: "bar",
            stack: "本月",
            data: txBy
        },
    )
    return {
        xData,
        series
    }
}
export let getPollutantOption = (obj, titleName) => {
    let arr = obj.series
    let arry = []
    arr.forEach(ele => {
        arry.push(ele.name)
    })
    return {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        title: {
            left: 'center',
            text: '污染物减排量' + titleName + '直方图(t)',
        },
        legend: {
            left: 'right',
            top: 20,
            data: arry,
        },
        color: ['#3aa1ff', '#36cbcb', '#4ecb73', '#fbd437', '#f2637b', '#975fe5', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                data: obj.xData
            },
        ],
        yAxis: [
            {
                type: "value",
            },
        ],
        series: arr,
    }
}
