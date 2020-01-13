// 处理返回结果，拼凑字段
export const formatterCurveData=(data, type = "line", smooth = true)=> {
    data = data == null || !data.length ? [] : data;
    var xData, series = [];
  
    // 循环出x轴的东西
    data.forEach((item, idx) => {
        if (!idx) {
            return false;
        }
        xData = item.dataList.map(ele => {
            return ele.x
        });
    });
    // 循环出系列
    data.forEach((item, idx) => {
        var obj = { type, smooth, lineStyle: { width: 2 }, symbolSize: 0 };
        obj.name = item.cnName;
        obj.data = item.dataList.map(ele => {
            return {
                value: ele.value,// 降了数量级的值
                point: ele.point || "-", // 鼠标点上去的原始值
                unit: item.unit, // 曲线单位
            }
        });
        series.push(obj)
    });
    return {
        x: xData,
        series
    }
  }
// 将返回结果拼凑为options结构
  export const getOption=(obj)=> {
    return {
        title: {
            // text: '折线图堆叠'
        },
        tooltip: {
            trigger: 'axis',
            textStyle: {
                color: "#ffffff",
                fontSize: 12
            },
            formatter(res){
                var html = "";
                 res.forEach((item,idx)=>{
                    !idx?html+=`${item.name}<br/>`:null;
                    html += `
                    <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${item.color};"></span>
                    ${item.seriesName}:${item.data.point}${item.unit || ""}<br/>
                    `
                  
                })
                return html
            }
        },
        legend: {
            // data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
            textStyle: {
                color: "#333333",
                fontSize: 12
            },
            inactiveColor:"#999999",
            top:10,
        },
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'filter'
            },
            {
                type: 'inside',
                yAxisIndex: 0,
                filterMode: 'filter'
            },
            {
                type: 'inside',
                xAxisIndex: 0,
                filterMode: 'filter'
            },
            {
                type: 'inside',
                yAxisIndex: 0,
                filterMode: 'filter'
            }
        ],
        grid: {
            left: '6%',
            right: '6%',
            bottom: 30,
            top: '20%',
            containLabel: false
        },
        color:["#10cfcb","#ff514c","#ffd64a","#30e600","#004CFF","#0000ff","#c2e4ff","#c80180","#008fff","#7469fb"],
        xAxis: {
            type: 'category',
            boundaryGap: true,
            data: obj.x,
            axisLabel: {
                show: true,
                align: 'center',
                 textStyle: {
                   color: '#3f4a61',  //更改坐标轴文字颜色
                   fontSize : 12     //更改坐标轴文字大小
                 }
              },
        },
        yAxis: {
            type: 'value',
            show:false,
        },
        series: obj.series
    }
}