
// 判断对象的值是否为空
export const hasValue = (obj) => {
    let values = Object.values(obj);
    let values_str = values.join("");
    if (!values_str) {
        return true
    }
    return false;
}
//判断某一行是否有数据
export const hasNoData = (data)=>{
    //计数器
    let num = 0;
    for (var key in data) {
        //排除区域电厂、日期和id字段
        if (key == "plant_name" || key == "plant_code" || key == "region_name" || key == "region_code" || key == "year" || key == "id") {
            continue;
        } else if (data[key] != null) {
            //遍历该行所有字段是否为null，不为null则计数器加1
            num++;
        }
    }
    return num;
}

//判断是否有可以新增的项目
export const hasNoDataProject = (data) => {
    let options = [];
    for (let i = 0; i < data.length; i++) { 
        //排除脱硫合计行
        if (data[i].plant_name != "脱硝合计") { 
            //如果计数器没有增加，则说明该行所有字段都是null,即可以新增 
            if (hasNoData(data[i]) <= 0) {
                //将可以新增的电厂名字保存到数组中
                let obj = {};
                obj.plant_code = data[i].plant_code;
                obj.region_code = data[i].region_code;
                obj.plant_name = data[i].plant_name;  
                options.push(obj);
            }
        }
    }  
    return options;
}

