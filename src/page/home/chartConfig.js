import _ from "lodash";
import { areaMap} from "../../dict/index"
export const pieData = (data = {
    dmap: {},
    nmap: { "W3.JX": "0.25", "W3.HN": "0.58", "W3.XN": "0.17" },
    smap: { "W3.JX": "0.28", "W3.HN": "0.39", "W3.XN": "0.16", "W3.XB": "0.16" },
    spro: 0,
    dpro: "0.00",
    npro: "0.49",
}) => {
    return [
        {
            value: data.spro * 100,
            name: "脱硫装置",
            itemStyle: {
                color: "#54CBCC"
            },
            data: data.smap
        },
        {
            value: data.npro * 100,
            name: "脱硝装置",
            itemStyle: {
                color: "#3AA0FF"
            },
            data: data.nmap
        },
        {
            value: data.dpro * 100,
            name: "除尘装置",
            itemStyle: {
                color: "#61CB6E"
            },
            data: data.dmap
        }
    ]
}
export const barData = (data={x:[],y:{now:[],before:[]}})=>{
    let {x,y:{now,before}} = data;
    return {
        color:["#E3E4EC","#0082FF"],
        xData:x,
        text:"月度历史同期对比",
        seriesData:[
          {
            name: '历史同期',
            type: 'bar',
            barGap: 0,
            data: now
          },
          {
            name: '当前',
            type: 'bar',
            barGap: 0,
            data: before
          },
        ]
      }
}
export const radarData = (data)=>{
    data || {
        text:"各区域当月消耗对比",
        indicator:[
          {text:"东北"},
          {text:"内蒙"},
          {text:"河南"},
          {text:"江西"},
          {text:"西北"}
        ],
        data:[]
    }
    return {
        text:data.name,
        indicator:data.indicator,
        data:data.data
    }
}
// 显示tip
export const pieTip = (data) => {
    let html = ""
     _.forOwn(data, function (value, key) {
        html += `
            <div>${areaMap[key]}：${(value*100).toFixed(2)}%</div>
        `
    });
    return html || "暂无数据"
}
export let pieConfig = (obj = {
    name: "",
    tipFun: (res) => { },
    data: []
}) => {
    let { name, tipFun, data } = obj;
    return {
        tooltip: {
            trigger: "item",
            formatter: tipFun
        },
        series: [
            {
                name: name,
                type: "pie",
                radius: "80%",
                center: ["50%", "55%"],
                data: data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                }
            }
        ]
    }
};
export let barConfig = (obj = {
    tipFun: (res) => { },
    legendData: [],
    seriesData: [],
    xData: [],
    color: [],
    text: ""
}) => {
    let { tipFun, seriesData, legendData, xData, color, text } = obj;
    if (legendData == null) {
        legendData = seriesData.map(item => {
            return item.name
        })
    }
    return {
        color,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: tipFun
        },
        legend: {
            data: legendData,
            top: 0,
        },
        title: {
            bottom: -5,
            left: "center",
            text: text,
            textStyle: {
                fontSize: 12,
                color: "rgba(51,51,51,.8)"
            }
        },
        grid: {
            left: 30,
            right: 0,
            top: 30,
            bottom: 40
        },
        calculable: false,
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "#E3E4EC"
                    }
                },
                data: xData
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "#E3E4EC"
                    }
                },
            }
        ],
        series: seriesData
    }
};
export let radarConfig = (obj = {
    text: "",
    indicator: [],
    data: []
}) => {
    let { text, indicator, data } = obj;
    return {
        title: {
            bottom: -5,
            left: "center",
            text,
            textStyle: {
                fontSize: 12,
                color: "rgba(51,51,51,.8)"
            }
        },
        radar: [
            {
                indicator,
                center: ['50%', '45%'],
                radius: "55%",
                startAngle: 90,
                splitNumber: 4,
                shape: 'circle',
                name: {
                    // formatter: '【{value}】',
                    formatter: '{value}',
                    textStyle: {
                        color: '#72ACD1'
                    }
                },
                splitArea: {
                    areaStyle: {
                        // color:"#fff",
                        color: [
                            '#E9E9E9', '#E9E9E9',
                            '#fff',
                            '#fff'
                        ]
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#F6F6F6'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#F6F6F6'
                    }
                }
            },
        ],
        series: [
            {
                name: text,
                type: 'radar',
                itemStyle: {
                    emphasis: {
                        lineStyle: {
                            width: 2
                        }
                    },
                    normal: {
                        color: '#118BFF'
                    }
                },
                data: [

                    {
                        value: data,
                        label: {
                            normal: {
                                show: true,
                                formatter: function (params) {
                                    return params.value;
                                }
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: '#83BCF2'
                            }
                        }
                    }
                ]
            }
        ]
    }

}

// 地图option 配置
export let mapConfig = (obj = {
    data: {},
    tipFun: (res) => { console.log(res)}
}) => {
    let { data, tipFun } = obj;
    console.log(data)
    return {

        tooltip: {
            trigger: 'item',
            formatter: tipFun
        },

        series: [
            {
                type: 'map',
                mapType: 'china',
                roam: true,
                aspectScale: 0.75,
                label: {
                    normal: {
                        show: false,
                    },
                    emphasis: {
                        show: false,
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: "#E5F2FF",
                        borderWidth: 0
                    },
                    emphasis: {
                        areaColor: "#E5F2FF",
                        borderWidth: 0
                    }
                },
                data: [
                    {
                        name: '辽宁', value: data["东北"], itemStyle: {
                            normal: { areaColor: "#F6D300", borderWidth: 0 },
                            emphasis: {
                                areaColor: "#F6D300"
                            }
                        }
                    }, // 东北
                    // 西北
                    {
                        name: '宁夏', value: data["西北"], itemStyle: {
                            normal: { areaColor: "#955EE8", borderWidth: 0 }, emphasis: {
                                areaColor: "#955EE8"
                            }
                        }
                    },
                    {
                        name: '新疆', value: data["西北"], itemStyle: {
                            normal: { areaColor: "#955EE8", borderWidth: 0 }, emphasis: {
                                areaColor: "#955EE8"
                            }
                        }
                    },
                    // 内蒙
                    {
                        name: '内蒙古', value: data["内蒙"], itemStyle: {
                            normal: {
                                areaColor: "#55CBCC", borderWidth: 0
                            },
                            emphasis: {
                                areaColor: "#55CBCC"
                            }
                        }
                    },
                    // 江西
                    {
                        name: '江西', value: data["江西"], itemStyle: {
                            normal: { areaColor: "#E96379", borderWidth: 0 }, emphasis: {
                                areaColor: "#E96379"
                            }
                        }
                    },
                    // 西南
                    {
                        name: '贵州', value: data["西南"], itemStyle: {
                            normal: { areaColor: "#0082FF", borderWidth: 0 }, emphasis: {
                                areaColor: "#0082FF"
                            }
                        }
                    },
                    {
                        name: '重庆', value: data["西南"], itemStyle: {
                            normal: { areaColor: "#0082FF", borderWidth: 0 }, emphasis: {
                                areaColor: "#0082FF"
                            }
                        }
                    },
                    // 河南
                    {
                        name: '河南', value: data["河南"], itemStyle: {
                            normal: { areaColor: "#60CB6D", borderWidth: 0 }, emphasis: {
                                areaColor: "#60CB6D"
                            }
                        }
                    },
                    {
                        name: '河北', value: data["河南"], itemStyle: {
                            normal: { areaColor: "#60CB6D", borderWidth: 0 }, emphasis: {
                                areaColor: "#60CB6D"
                            }
                        }
                    },

                ]
            },
        ]
    }
}