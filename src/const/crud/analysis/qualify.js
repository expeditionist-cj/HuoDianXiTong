let dict = {
    n_run_time: "脱硝",
    s_run_time: "脱硫"
}
export let transferQualifyData = (data, compareMethod) => {

    // 循环出x轴
    let xData = []
    let jzData = []
    let compareData = []
    let series = []
    data.forEach(ele => {
        xData.push(ele.project_name)
        jzData.push(ele.run_time);
        compareData.push(ele[compareMethod])
    });
    // 循环出y轴
    series.push(
        {
            name: "机组",
            type: "bar",
            stack: "机组",
            data: jzData
        },
        {
            name: dict[compareMethod],
            type: "bar",
            stack: "装置",
            data: compareData
        },
    )

    return {
        xData,
        series
    }
}
export let getQualifyOption = (obj, titleName) => {
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
            text: titleName + '装置合格投运率(h)',
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
