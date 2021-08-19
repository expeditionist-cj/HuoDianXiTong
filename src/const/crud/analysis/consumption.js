let dict = {
    // 同比
    tb: {
        xsj: "lastYearXsData",
        hyj: "lastYearHyjData",
        dh: "lastYearDh",
        name: "同期",
        type: "bar"
    },
    // 环比
    hb: {
        xsj: "lastMonthXsData",
        hyj: "lastMonthData",
        dh: "lastMonthDh",
        name: "上月",
        type: "bar"
    },
    // 完成率
    wcl: {
        xsj: "xsjPlan",
        hyj: "hyjPlan",
        dh: "planDh",
        name: "计划",
        type: "bar"
    },
    // 减排量 
    jpl: {
        xsj: "outSo2MntXsBore",
        hyj: "outNoxMntHyjBore",
        dh: "outMntDhBore",
        name: "减排量",
        type: "line"
    },
    // 发电量 --> 耗用率
    hyl: {
        xsj: "genPowerXsBore",
        hyj: "genPowerHyjBore",
        dh: "genPowerDhBore",
        name: "发电量",
        type: "line"
    },
}
export let transferConsumData = (data, compareMethod) => {
    let keys = dict[compareMethod]
    let xData = []
    let xsjSeries = []  //吸收剂y轴
    let hyjSeries = []  //还原剂y轴
    let dhSeries = []  //电耗y轴
    let xsjTq = []
    let hyjTq = []
    let dhTq = []
    let xsjBy = []
    let hyjBy = []
    let dhBy = []
    data.forEach(ele => {
        xData.push(ele.deptName)
        //对比
        xsjTq.push(ele[keys.xsj])
        hyjTq.push(ele[keys.hyj])
        dhTq.push(ele[keys.dh])
        // 本月
        if (compareMethod == "hyl") {
            xsjBy.push(ele[dict.jpl.xsj])
            hyjBy.push(ele[dict.jpl.hyj])
            dhBy.push(ele[dict.jpl.dh])
        } else {
            xsjBy.push(ele.baseXsData)
            hyjBy.push(ele.baseHyjData)
            dhBy.push(ele.baseDh)
        }
    });
    //吸收剂y轴
    xsjSeries.push(
        {
            name: compareMethod == "hyl" ? "吸收剂耗用率（发电量口径）" : keys.name + "吸收剂",
            type: keys.type,
            stack: keys.name,
            data: xsjTq
        },
        {
            name: compareMethod == "hyl" ? "吸收剂耗用率（减排量口径）" : "本月吸收剂",
            type: keys.type,
            stack: "本月吸收剂",
            data: xsjBy
        },
    )
    //还原剂y轴
    hyjSeries.push(
        {
            name: compareMethod == "hyl" ? "还原剂耗用率（发电量口径）" : keys.name + "还原剂",
            type: keys.type,
            stack: keys.name,
            data: hyjTq
        },
        {
            name: compareMethod == "hyl" ? "还原剂耗用率（减排量口径）" : "本月还原剂",
            type: keys.type,
            stack: "本月还原剂",
            data: hyjBy
        },
    )
    //电耗y轴
    dhSeries.push(
        {
            name: compareMethod == "hyl" ? "耗电率（发电量口径）" : keys.name + "耗电量",
            type: keys.type,
            stack: keys.name,
            data: dhTq
        },
        {
            name: compareMethod == "hyl" ? "耗电率（减排量口径）" : "本月耗电量",
            type: keys.type,
            stack: "本月耗电量",
            data: dhBy
        },
    )


    return {
        xData,
        series: {
            xsjSeries,
            hyjSeries,
            dhSeries
        }
    }
}
export let getConsumOption = (obj, paramsType, typeName, titleName) => {
    let arr = obj.series[paramsType]
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
            text: typeName + titleName + (titleName == "耗用率" ? "曲线图(%)" : "堆叠柱状图(t)"),
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
