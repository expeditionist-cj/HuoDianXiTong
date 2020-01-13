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
    "load": "总负荷 (WM)",
    "currentGeneration": "当日发电量 (万KWh)",
    "startNum": "运行机组 (台)",
    "stopNum": "停运机组 (台)",
    "capacity": "装机容量 (WM)",
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
    n_run_rate: "脱硝合格投运率(%)",
    gen_power: "发电量(万KWh)",
    net_power: "上网电量(万KWh)",
    run_time: "主机运行小时数(h)",
    load_rate: "主机负荷率(%)",
    use_time: "利用小时(h)",
    s_run_time: "脱硫运行小时数(h)",
    n_run_time: "脱硝运行小时数(h)",
    s_run_rate: "脱硫合格投运率(%)",
    
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
        prop: "sum_gypsum_output",
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
    '耗汽量': {
        prop: "air_consumption",
        label: '吨/万KWh',
        width: math_clm_width("吨/万KWh ")
    },
    '耗汽率': {
        prop: "air_consumption_rate",
        label: '耗汽率',
        width: math_clm_width("吨/万KWh ")
    }
}
// 脱硝耗用统计表
export const NX_EMS_YA = {
    '采购量': {
        prop: "ya_cg",
        label:'采购量',
        unit:'吨',
        width: math_clm_width("采购量111 ")
    },
    '耗量': {
        prop: "_ya_hl",
        label:'耗量',
        unit:'吨',
        width: math_clm_width("库存量111 ")
    },
    '库存量': {
        prop: "ya_kc",
        label: "库存量",
        unit:'吨', 
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
        label:'采购量',
        label: "吨",
        width: math_clm_width("采购量111 ")
    },
    '耗量': {
        prop: "_ns_hl",
        label:'耗量',
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
        width: math_clm_width("mg/Nm³")
    },
    '折算mg/Nm³': {
        prop: "in_so2_cv",
        label: '折算mg/Nm³',
        width: math_clm_width("FGDSO2产生量")
    },
    't/d': {
        prop: "in_so2_mnt",
        label: 't/d',
        width: math_clm_width("t/dasd")
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
        width: math_clm_width("mg/Nm³")
    },
    '折算mg/Nm³': {
        prop: "out_so2_cv",
        label: '折算mg/Nm³',
        width: math_clm_width("FGDSO2产生量")
    },
    't/d': {
        prop: "out_so2_mnt",
        label: 't/d',
        width: math_clm_width("t/dasd")
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
        width: math_clm_width("mg/Nm³")
    },
    '折算mg/Nm³': {
        prop: "inNoxCv",
        label: '折算mg/m³',
        width: math_clm_width("FGDSO2产生量")
    },
    't/d': {
        prop: "inNoxMnt",
        label: 't/d',
        width: math_clm_width("t/dasd")
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
        width: math_clm_width("mg/Nm³")
    },
    '折算mg/Nm³': {
        prop: "outNoxCv",
        label: '折算mg/Nm³',
        width: math_clm_width("FGDSO2产生量")
    },
    't/d': {
        prop: "outNoxMnt",
        label: 't/d',
        width: math_clm_width("t/dasd")
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
    nh3:"氨氮",

}
// 智能助手模型对应的modelId
export const modelId = {
    "供浆智能优化":1,
    "脱水智能优化":2,
    "烟气流量智能分析":3,
    "吸收循环智能优化":4,
    "出口智能预测":5,
    "装置电耗智能分析":6
}