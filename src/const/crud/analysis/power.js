let dict = {
    ts: "脱硫",
    tx: "脱硝",
    dust: "除尘"
}
export let transferPowerData = (data, compareMethod, compareName) => {

    // 循环出x轴
    let xData = []
    let series = []
    let keys = []
    data.forEach(ele => {
        xData.push(ele.ts.name)
        keys = Object.keys(ele)
    });
    // 循环出y轴
    keys.map(k => {
        let tq = []
        let by = []
        data.forEach(ele => {
            tq.push(ele[k][compareMethod])
            by.push(ele[k].baseMonthData)
        })
        series.push(
            {
                name: compareName + dict[k],
                type: "bar",
                stack: compareName,
                data: tq
            },
            {
                name: "本月" + dict[k],
                type: "bar",
                stack: "本月",
                data: by
            }
        )
    })


    return {
        xData,
        series
    }
}
export let getPowerOption = (obj, titleName) => {
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
            text: '发电量' + titleName + '堆叠柱状图(万kWh)',
        },
        color: ['#3aa1ff', '#36cbcb', '#4ecb73', '#fbd437', '#f2637b', '#975fe5', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        legend: {
            left: 'right',
            top: 20,
            data: arry,
        },
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
