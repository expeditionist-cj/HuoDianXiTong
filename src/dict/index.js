import _ from "lodash";
import { Row } from "element-ui";
const math_clm_width = (data) => {
    return data.length * 15;
}
// 区域code 对应 中文
export const areaMap = {
    "W3.JX": "江西",
    "W3.HN": "河南",
    "W3.XN": "西南",
    "W3.XB": "西北",
    "W3.DB": "东北",
    "W3.NM": "内蒙"
}
// 区域code 对应 中文
export const areaMapCons = {
    "JX": "江西",
    "HN": "河南",
    "XN": "西南",
    "XB": "西北",
    "DB": "东北",
    "NM": "内蒙"
}
// 首页基础数据 映射
export const baseMap = {
    "load": "总负荷 (MW)",
    "currentGeneration": "当日发电量 (万KWh)",
    "startNum": "运行机组 (台)",
    "stopNum": "停运机组 (台)",
    "capacity": "装机容量 (MW)",
}
// 首页地图映射表
export const map_map =
{
    "辽宁": "东北",
    "宁夏": "西北",
    "新疆": "西北",
    "内蒙古": "内蒙",
    "江西": "江西",
    "贵州": "西南",
    "重庆": "西南",
    "河南": "河南",
    "河北": "河南",
}
// 脱硫脱硝装置发电量统计表
export const power_GNT = {  
    use_time: "利用小时(h)",
    gen_power: "发电量(万KWh)",
    net_power: "上网电量(万KWh)",
    run_time: "主机运行小时数(h)",
    s_run_time: "脱硫运行小时数(h)",
    n_run_time: "脱硝运行小时数(h)",
    s_run_rate: "脱硫合格投运率(%)",
    n_run_rate: "脱硝合格投运率(%)",
    load_rate: "主机负荷率(%)",
    // day: "日期"
}
// 脱硫耗用统计表
export const DE_EMS_LS = {
    '采购量': {
        prop: "limestone_powder_procure",
        label: "采购量",
        width: math_clm_width("采购量111 ")
    },
    '库存量': {
        prop: "limestone_powder_stock",
        label: '库存量',
        width: math_clm_width("库存量111 ")
    },
    '纯度': {
        prop: "limestone_powder_purity",
        label: '纯度',
        width: math_clm_width("库存量111 ")
    },
    '耗量': {
        prop: "_limestone_powder_consum",
        label: "耗量",
        width: math_clm_width("库存量111 ")
    },
    '合计': {
        prop: "sum_limestone_powder_consum",
        label: '合计',
        width: math_clm_width("吨/万KWh ")
    },
    '耗用率': {
        prop: "sum_limestone_powder_consum_rate",
        label: '耗用率',
        width: math_clm_width("吨/万KWh ")
    }
}
export const DE_EMS_CB = {
    '采购量': {
        prop: "carbide_slag_procure",
        label: "采购量",
        width: math_clm_width("采购量111 ")
    },
    '库存量': {
        prop: "carbide_slag_stock",
        label: '库存量',
        width: math_clm_width("库存量111 ")
    },
    '纯度': {
        prop: "carbide_slag_purity",
        label: '纯度',
        width: math_clm_width("库存量111 ")
    },
    '耗量': {
        prop: "_carbide_slag_consum",
        label: "耗量",
        width: math_clm_width("库存量111 ")
    },
    '合计': {
        prop: "sum_carbide_slag_consum",
        label: '合计',
        width: math_clm_width("吨/万KWh ")
    },
    '耗用率': {
        prop: "sum_carbide_slag_consum_rate",
        label: '耗用率',
        width: math_clm_width("吨/万KWh ")
    }
}
export const DE_EMS_SUM = {
    '总耗量': {
        prop: "sumhl",
        label: '总耗量',
        width: math_clm_width("吨/万KWh ")
    },
    '总耗用率': {
        prop: "sumhl_rate",
        label: '总耗用率',
        width: math_clm_width("吨/万KWh ")
    },
}
export const DE_EMS_DH = {
    '电耗': {
        prop: "_power",
        label: '电耗',
        width: math_clm_width("#1电耗 ")
    },
    '电耗合计': {
        prop: "sum_power",
        label: '万KWh',
        width: math_clm_width("万KWh ")
    },
    '厂用电率': {
        prop: "sum_power_rate",
        label: '厂用电率',
        width: math_clm_width("厂用电率 ")
    },
    '分摊': {
        prop: "_share",
        label: '分摊',
        width: math_clm_width("#1分摊 ")
    },
    '分摊合计': {
        prop: "sum_share",
        label: '万KWh',
        width: math_clm_width("万KWh ")
    },
    '分摊厂用电率': {
        prop: "sum_share_rate",
        label: '分摊厂用电率',
        width: math_clm_width("分摊厂用电率 ")
    },
    '总电量': {
        prop: "sumdh",
        label: '总电量',
        width: math_clm_width("万KWh ")
    },
    '总厂用电率': {
        prop: "sumdh_rate",
        label: '总厂用电率',
        width: math_clm_width("总厂用电率 ")
    }
}
export const DE_EMS_YS = {
    '工业水': {
        prop: "industrial_water",
        label: '工业水',
        width: math_clm_width("工业水(中水、冷却水) ")
    },
    '工艺水': {
        prop: "process_water",
        label: '工艺水',
        width: math_clm_width("工业水(中水、冷却水) ")
    },
    '合计': {
        prop: "sum_water",
        label: '合计',
        width: math_clm_width("吨/万KWh ")
    },
    '耗水率': {
        prop: "sum_water_rate",
        label: '耗水率',
        width: math_clm_width("吨/万KWh ")
    }
}
export const DE_EMS_SG = {
    '石膏产量': {
        prop: "_gypsum_output",
        label: '石膏产量',
        width: math_clm_width("#1石膏产量 ")
    },
    '石膏总产量': {
        prop: "gypsum_output",
        label: '石膏产量',
        width: math_clm_width("#1石膏产量 ")
    },
    '石膏销量': {
        prop: "gypsum_sales",
        label: '石膏销量',
        width: math_clm_width("#1石膏销量 ")
    }
}
export const DE_EMS_HQL = {
    '耗气量': {
        prop: "air_consumption",
        label: '吨/万KWh',
        width: math_clm_width("吨/万KWh ")
    },
    '耗气率': {
        prop: "air_consumption_rate",
        label: '耗气率',
        width: math_clm_width("吨/万KWh ")
    },
    '耗汽量': {
        prop: "steam_comsumption",
        label: '吨/万KWh',
        width: math_clm_width("吨/万KWh ")
    },
    '耗汽率': {
        prop: "steam_comsumption_rate",
        label: '耗汽率',
        width: math_clm_width("吨/万KWh ")
    }
}
// 脱硝耗用统计表
export const NX_EMS_YA = {
    '采购量': {
        prop: "ya_cg",
        label: '采购量',
        unit: '吨',
        width: math_clm_width("采购量111 ")
    },
    '耗量': {
        prop: "_ya_hl",
        label: '耗量',
        unit: '吨',
        width: math_clm_width("库存量111 ")
    },
    '库存量': {
        prop: "ya_kc",
        label: "库存量",
        unit: '吨',
        width: math_clm_width("库存量111 ")
    },
    '纯度>99.6%': {
        prop: "ya_cd",
        label: "纯度>99.6%",
        label: '%',
        width: math_clm_width("库存量111 ")
    },
    '合计': {
        prop: "ya_hj",
        label: "合计",
        label: '吨',
        width: math_clm_width("吨/万KWh ")
    },
    '耗用率': {
        prop: "ya_rate",
        label: "耗用率",
        label: '吨/万KWh',
        width: math_clm_width("吨/万KWh ")
    }
}
export const NX_EMS_NS = {
    '采购量': {
        prop: "ns_cg",
        label: '采购量',
        label: "吨",
        width: math_clm_width("采购量111 ")
    },
    '耗量': {
        prop: "_ns_hl",
        label: '耗量',
        label: "吨",
        width: math_clm_width("库存量111 ")
    },
    '库存量': {
        prop: "ns_kc",
        label: "库存量",
        label: '吨',
        width: math_clm_width("库存量111 ")
    },
    '总氮': {
        prop: "ns_zd",
        label: "总氮",
        label: '%',
        width: math_clm_width("库存量111 ")
    },
    '合计': {
        prop: "ns_hj",
        label: "合计",
        label: '吨',
        width: math_clm_width("吨/万KWh ")
    },
    '耗用率': {
        prop: "ns_rate",
        label: "耗用率",
        label: '吨/万KWh',
        width: math_clm_width("吨/万KWh ")
    }
}
export const NX_EMS_HYJ = {
    '总耗量': {
        prop: "hyj_hj",
        label: "总耗量",
        label: '吨',
        width: math_clm_width("吨/万KWh ")
    },
    '总耗用率': {
        prop: "hyj_rate",
        label: "总耗用率",
        label: '吨/万KWh',
        width: math_clm_width("吨/万KWh ")
    }
}
export const NX_EMS_DH = {
    '电耗': {
        prop: "_dh",
        label: "电耗",
        label: 'KWh',
        width: math_clm_width("#1电耗 ")
    },
    '电耗合计': {
        prop: "dh_hj",
        label: "合计",
        label: '万KWh',
        width: math_clm_width("万KWh ")
    },
    '厂用电率': {
        prop: "dh_rate",
        label: "厂用电率",
        label: '%',
        width: math_clm_width("厂用电率 ")
    },
    '公用系统电耗': {
        prop: "gy_dh",
        label: "公用系统电耗",
        label: '万KWh',
        width: math_clm_width("公用系统电耗 ")
    },
    '公用厂用电率': {
        prop: "gy_dh_rate",
        label: "公用厂用电率",
        label: '%',
        width: math_clm_width("公用厂用电率 ")
    },
    '分摊': {
        prop: "_ft",
        label: "分摊",
        label: '万KWh',
        width: math_clm_width("#1分摊 ")
    },
    '分摊合计': {
        prop: "ft_hj",
        label: "合计",
        label: '万KWh',
        width: math_clm_width("万KWh ")
    },
    '分摊厂用电率': {
        prop: "ft_rate",
        label: "分摊厂用电率",
        label: '%',
        width: math_clm_width("分摊厂用电率 ")
    },
    '总电量': {
        prop: "zdh",
        label: "总电量",
        label: '万KWh',
        width: math_clm_width("万KWh ")
    },
    '总厂用电率': {
        prop: "zdh_rate",
        label: "总厂用电率",
        label: '%',
        width: math_clm_width("总厂用电率 ")
    }
}
export const NX_EMS_YS = {
    '工业水': {
        prop: "gys",
        label: "工业水",
        label: '吨',
        width: math_clm_width("工业水 ")
    },
    '工业耗水率': {
        prop: "gys_rate",
        label: "工业耗水率",
        label: '吨/万KWh',
        width: math_clm_width("工业耗水率 ")
    },
    '除盐水': {
        prop: "cys",
        label: "除盐水",
        label: '吨',
        width: math_clm_width("除盐水 ")
    },
    '除盐耗水率': {
        prop: "cys_rate",
        label: "除盐耗水率",
        label: '吨/万KWh',
        width: math_clm_width("除盐耗水率 ")
    }
}
export const NX_EMS_HQL = {
    '耗汽量': {
        prop: "hql",
        label: "耗汽量",
        label: '吨/万KWh',
        width: math_clm_width("吨/万KWh ")
    },
    '耗汽率': {
        prop: "hql_rate",
        label: "耗汽率",
        label: '吨',
        width: math_clm_width("吨/万KWh ")
    }
}
export const NX_EMS_GAS = {
    '耗气量': {
        prop: "gas",
        label: "耗气量",
        label: '吨/万KWh',
        width: math_clm_width("吨/万KWh ")
    },
    '耗气率': {
        prop: "gas_rate",
        label: "耗气率",
        label: '吨',
        width: math_clm_width("吨/万KWh ")
    }
}

// 脱硫装置排放连续监测日平均月报表-原烟气
export const DE_GAS_ORIGIN = {
    'mg/Nm³': {
        prop: "in_so2_rv",
        label: "mg/Nm³",
        width: math_clm_width("实测(mg/Nm³)")
    },
    '折算mg/Nm³': {
        prop: "in_so2_cv",
        label: '折算mg/Nm³',
        width: math_clm_width("折算(mg/Nm³)")
    },
    't/d': {
        prop: "in_so2_mnt",
        label: 't/d',
        width: math_clm_width("产生(t/d)")
    },
    '标态流量': {
        prop: "in_smk_mnt",
        label: "X104",
        width: math_clm_width("10⁴m³/d")
    },
    '氧量': {
        prop: "in_o2_rv",
        label: '%',
        width: math_clm_width("氧量aas")
    },
    '烟温': {
        prop: "in_smk_tpr",
        label: '℃',
        width: math_clm_width("烟温aas")
    }
}
// 脱硫装置排放连续监测日平均月报表-原烟气
export const DE_GAS_OVER = {
    'mg/Nm³': {
        prop: "out_so2_rv",
        label: "mg/Nm³",
        width: math_clm_width("实测浓度(mg/Nm³)")
    },
    '折算mg/Nm³': {
        prop: "out_so2_cv",
        label: '折算mg/Nm³',
        width: math_clm_width("折算浓度(mg/Nm³)")
    },
    't/d': {
        prop: "out_so2_mnt",
        label: 't/d',
        width: math_clm_width("产生量(t/d)")
    },
    '标态流量': {
        prop: "out_smk_mnt",
        label: "X104",
        width: math_clm_width("10⁴m³/d")
    },
    '氧量': {
        prop: "out_o2_rv",
        label: '%',
        width: math_clm_width("氧量aas")
    },
    '烟温': {
        prop: "out_smk_tpr",
        label: '℃',
        width: math_clm_width("烟温aasa")
    },
    '脱硫效率': {
        prop: "so2_ecc",
        label: '脱硫效率',
        width: math_clm_width("脱硫效率a")
    }
}
// 脱硝装置排放连续检测日平均值月报表-原烟气
export const NX_GAS_ORIGIN = {
    'mg/Nm³': {
        prop: "inNoxRv",
        label: "mg/Nm³",
        width: math_clm_width("实测(mg/Nm³)")
    },
    '折算mg/Nm³': {
        prop: "inNoxCv",
        label: '折算mg/m³',
        width: math_clm_width("折算浓度(mg/Nm³)")
    },
    't/d': {
        prop: "inNoxMnt",
        label: 't/d',
        width: math_clm_width("产生(t/d)")
    },
    '标态流量': {
        prop: "inSmkMnt",
        label: "X104",
        width: math_clm_width("10⁴m³/d")
    },
    '氧量': {
        prop: "inO2Rv",
        label: '%',
        width: math_clm_width("氧量aas")
    },
    '烟温': {
        prop: "inSmkTpr",
        label: '℃',
        width: math_clm_width("烟温aas")
    }
}

// 脱硝装置排放连续检测日平均值月报表-净烟气
export const NX_GAS_OVER = {
    'mg/Nm³': {
        prop: "outNoxRv",
        label: "mg/Nm³",
        width: math_clm_width("实测浓度(mg/Nm³)")
    },
    '折算mg/Nm³': {
        prop: "outNoxCv",
        label: '折算mg/Nm³',
        width: math_clm_width("折算浓度(mg/Nm³)")
    },
    't/d': {
        prop: "outNoxMnt",
        label: 't/d',
        width: math_clm_width("t/d")
    },
    '标态流量': {
        prop: "outSmkMnt",
        label: "X104",
        width: math_clm_width("10⁴m³/d")
    },
    '氧量': {
        prop: "outO2Rv",
        label: '%',
        width: math_clm_width("氧量aas")
    },
    '烟温': {
        prop: "outSmkTpr",
        label: '℃',
        width: math_clm_width("烟温aasa")
    },
    "氨逃逸": {
        prop: "nh3",
        label: 'PPm',
        width: math_clm_width("烟温aa")
    },
    '脱硝效率': {
        prop: "efficiency",
        label: '脱硝效率',
        width: math_clm_width("脱硫效率a")
    },

}
export const NOX = {
    prop: "cct",
    label: '排口nox浓度',
    width: math_clm_width("排口nox浓")
};
export const a = {
    nh3: "氨氮",

}
// 智能助手模型对应的modelId
export const modelId = {
    "供浆智能优化": 1,
    "脱水智能优化": 2,
    "烟气流量智能分析": 3,
    "吸收循环智能优化": 4,
    "出口智能预测": 5,
    "装置电耗智能分析": 6
}

// 脱硫计划指标
export const DE_PLAN_IDX = {
    '计划发电量': {
        prop: "plan_power",
        width: math_clm_width("计划发电量1 ")
    },
    '计划上网电量': {
        prop: "plan_net_power",
        width: math_clm_width("计划上网电量1 ")
    },
    '计划负荷率': {
        prop: "plan_load_rate",
        label: '纯度',
        width: math_clm_width("计划负荷率1 ")
    },
    '装置运行时间': {
        prop: "run_time",
        width: math_clm_width("装置运行时间1 ")
    },
    '入口SO₂浓度': {
        prop: "in_so2",
        width: math_clm_width("入口SO₂浓度1 ")
    },
    't/万KWh': {
        prop: "xsj_rate",
        width: math_clm_width("t/万KWh ")
    },
    't': {
        prop: "xsj",
        width: math_clm_width("t/万KWh ")
    },
    '装置率': {
        prop: "hd_rate",
        width: math_clm_width("吨/万KWh ")
    },
    '装置': {
        prop: "hd",
        width: math_clm_width("吨/万KWh ")
    },
    '分摊率': {
        prop: "ft_rate",
        width: math_clm_width("吨/万KWh ")
    },
    '分摊': {
        prop: "ft",
        width: math_clm_width("吨/万KWh ")
    },
    '合计率': {
        prop: "total_rate",
        width: math_clm_width("吨/万KWh ")
    },
    '合计': {
        prop: "total",
        width: math_clm_width("吨/万KWh ")
    },
    '计划率': {
        prop: "water_rate",
        width: math_clm_width("吨/万KWh ")
    },
    '计划': {
        prop: "water",
        width: math_clm_width("吨/万KWh ")
    }
}

// 脱硝计划指标
export const NX_PLAN_IDX = {
    '计划发电量': {
        prop: "plan_power",
        width: math_clm_width("计划发电量1 ")
    },
    '计划上网电量': {
        prop: "plan_net_power",
        width: math_clm_width("计划上网电量1 ")
    },
    '计划负荷率': {
        prop: "plan_load_rate",
        label: '纯度',
        width: math_clm_width("计划负荷率1 ")
    },
    '脱硫运行时间': {
        prop: "run_time",
        width: math_clm_width("装置运行时间1 ")
    },
    '入口NOx浓度': {
        prop: "in_nox",
        width: math_clm_width("入口SO₂浓度1 ")
    },
    't/万KWh': {
        prop: "xsj_rate",
        width: math_clm_width("t/万KWh ")
    },
    't': {
        prop: "xsj",
        width: math_clm_width("t/万KWh ")
    },
    '计划率': {
        prop: "hd_rate",
        width: math_clm_width("吨/万KWh ")
    },
    '计划': {
        prop: "hd",
        width: math_clm_width("吨/万KWh ")
    },
    '分摊率': {
        prop: "ft_rate",
        width: math_clm_width("吨/万KWh ")
    },
    '分摊': {
        prop: "ft",
        width: math_clm_width("吨/万KWh ")
    },
    '合计率': {
        prop: "total_rate",
        width: math_clm_width("吨/万KWh ")
    },
    '合计': {
        prop: "total",
        width: math_clm_width("吨/万KWh ")
    },
    '蒸汽率': {
        prop: "gas_rate",
        width: math_clm_width("吨/万KWh ")
    },
    '蒸汽': {
        prop: "gas",
        width: math_clm_width("吨/万KWh ")
    }
}
// 除尘计划指标
export const DUST_PLANT = {
    '计划发电量': {
        prop: "planGeneration",
        width: math_clm_width("计划发电量")
    },
    '计划上网电量': {
        prop: "planElectricityConsumption",
        width: math_clm_width("计划上网电量")
    },
    '计划负荷率': {
        prop: "planLoadRate",
        label: '纯度',
        width: math_clm_width("计划负荷率")
    },
    '脱硫运行时间': {
        prop: "runTime",
        width: math_clm_width("脱硫运行时1")
    },
    '入口NOx浓度': {
        prop: "inletConsistency", // 入口烟气浓度
        width: math_clm_width("入口NOx浓")
    },
    '吨/万KWh': {
        prop: "absorbentConsumptionRate",
        width: math_clm_width("12345")
    },
    '吨': {
        prop: "absorbentConsumption",
        width: math_clm_width("1234")
    },
    '计划万KWh': {
        prop: "planConsumePower",
        width: math_clm_width("万KWh")
    },
    '计划%': {
        prop: "planConsumePowerRate",
        width: math_clm_width("1234")
    },
    '分摊KWh': {
        prop: "shareConsumePower",
        width: math_clm_width("万KWh ")
    },
    '分摊%': {
        prop: "shareConsumePowerRate",
        width: math_clm_width("1234")
    },
    '合计%': {
        prop: "sumConsumePowerRate",
        width: math_clm_width("1234")
    },
    '合计万KWh': {
        prop: "sumConsumePower",
        width: math_clm_width("万KWh ")
    },
    '蒸汽吨': {
        prop: "steam",
        width: math_clm_width("1234")
    },
    '蒸汽万KWh': {
        prop: "steamRate",
        width: math_clm_width("t/万KWh")
    }
}

//汇总表--脱硫月度表
export const DE_SUMMARY = {
    '主机发电量': {
        prop: "",
        width: math_clm_width("主机发电量")
    },
    '负荷率': {
        prop: "",
        width: math_clm_width("负荷率")
    },
    '主机上网电量': {
        prop: "",
        width: math_clm_width("主机上网电量")
    },
    '机组运行时间': {
        prop: "",
        width: math_clm_width("机组运行时间")
    },
    '脱硫超排（超限）时间': {
        prop: "",
        width: math_clm_width("脱硫超排（超限）时间")
    },
    '合格投运率': {
        prop: "",
        width: math_clm_width("合格投运率")
    },
    '入口SO2浓度': {
        prop: "",
        width: math_clm_width("入口SO2浓度")
    },
    '出口SO2浓度': {
        prop: "",
        width: math_clm_width("出口SO2浓度")
    },
    '脱硫效率': {
        prop: "",
        width: math_clm_width("脱硫效率")
    },
    '标态流量': {
        prop: "",
        width: math_clm_width("标态流量")
    },
    '在线产生SO2量': {
        prop: "",
        width: math_clm_width("在线产生SO2量")
    },
    '在线排放SO2量': {
        prop: "",
        width: math_clm_width("在线排放SO2量")
    },
    '装置耗电量': {
        prop: "",
        width: math_clm_width("装置耗电量")
    },
}

//汇总表--脱硝月度表
export const NX_SUMMARY = {
    '主机发电量': {
        prop: "",
        width: math_clm_width("主机发电量")
    },
    '负荷率': {
        prop: "",
        width: math_clm_width("负荷率")
    },
    '主机上网电量': {
        prop: "",
        width: math_clm_width("主机上网电量")
    },
    '机组运行时间': {
        prop: "",
        width: math_clm_width("机组运行时间")
    },
    '脱硝超排（超限）时间': {
        prop: "",
        width: math_clm_width("脱硝超排（超限）时间")
    },
    '合格投运率': {
        prop: "",
        width: math_clm_width("合格投运率")
    },
    '入口NOx浓度': {
        prop: "",
        width: math_clm_width("入口NOx浓度")
    },
    '出口NOx浓度': {
        prop: "",
        width: math_clm_width("出口NOx浓度")
    },
    '脱硝效率': {
        prop: "",
        width: math_clm_width("脱硝效率")
    },
    '脱硫出口NOx浓度': {
        prop: "",
        width: math_clm_width("脱硫出口NOx浓度")
    },
    '脱硫出口NOx效率': {
        prop: "",
        width: math_clm_width("脱硫出口NOx效率")
    },
    '标态流量': {
        prop: "",
        width: math_clm_width("标态流量")
    },
    '在线产生NOx量': {
        prop: "",
        width: math_clm_width("在线产生NOx量")
    },
    '在线排放NOx量': {
        prop: "",
        width: math_clm_width("在线排放NOx量")
    }
}