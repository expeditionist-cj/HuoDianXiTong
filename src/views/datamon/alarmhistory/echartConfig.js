export let lineConfig = (obj = {
    tipFun: (res) => { },
    legendData: [],
    seriesData: [],
    xData: [],
    color: [],
    text: ""
}) => {
    let { tipFun, seriesData, legendData, xData, color, text } = obj;
    return {
        grid: {
            left: 30,
            right: 40,
            top: 30,
            bottom: 40
        },
        tooltip: {
            trigger: 'axis',
            // axisPointer: {
            //     type: 'shadow'
            // },
            formatter: tipFun
        },
        xAxis: {
            type: 'category',
            name: "时间",
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#E3E4EC"
                }
            },
            axisLine: {
                lineStyle: {
                    color: "#E3E4EC"
                }
            },
            data: xData
        },
        yAxis: {
            type: 'value',
            name: "参数值",
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#E3E4EC"
                }
            },
            axisLine: {
                lineStyle: {
                    color: "#E3E4EC"
                }
            },
        },
        series: [{
            data: seriesData,
            type: 'line',
            name: text,
            smooth: true,
            lineStyle: {
                color: "#3F9EFF",
                width: 3,
            }
        }]
    }
}
