export const tableOption = {
    border: false,
    stripe: false,
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    align: 'center',
    menu:false,
    // menuWidth:150,
    refreshBtn: false,
    addBtn: false,
    columnBtn: false,
    size:"small",
    // height:400,
    column: [
        {
            label: '项目',
            prop: 'plantCn',
            fixed: true
        },
        {
            label: '吸收剂采购量',
            children: [
                {
                    label: "本日（t）",
                    prop: "absBuyDay",
                    minWidth: '80',
                },
                {
                    label: "本月累计（t）",
                    prop: "absBuyMonth",
                    minWidth: '80',
                },
                {
                    label: "当天库存可使用天数",
                    prop: "absCanUse",
                    minWidth: '100',
                },
            ]
        },
        {
            label: '吸收剂耗量',
            children: [
                {
                    label: "本日（t）",
                    prop: "absUseDay",
                    minWidth: '80',
                },
                {
                    label: "本月累计（t）",
                    prop: "absUseMonth",
                    minWidth: '80',
                }
            ]
        },
        {
            label: '石膏出库量',
            children: [
                {
                    label: "本日（t）",
                    prop: "gypOutputDay",
                    minWidth: '80',
                },
                {
                    label: "本月累计（t）",
                    prop: "gypOutputMonth",
                    minWidth: '80',
                }
            ]
        },
        {
            label: '还原剂采购量',
            children: [
                {
                    label: "本日（t）",
                    prop: "redBuyDay",
                    minWidth: '80',
                },
                {
                    label: "本月累计（t）",
                    prop: "redBuyMonth",
                    minWidth: '80',
                },
                {
                    label: "当天库存可使用天数",
                    prop: "redCanUse",
                    minWidth: '100',
                },
            ]
        },
        {
            label: '还原剂耗量',
            children: [
                {
                    label: "本日（t）",
                    prop: "redUseDay",
                    minWidth: '80',
                },
                {
                    label: "本月累计（t）",
                    prop: "redUseMonth",
                    minWidth: '80',
                }
            ]
        },
        {
            label: '增效剂添加量',
            children: [
                {
                    label: "本日（kg）",
                    prop: "synUseDay",
                    minWidth: '100',
                },
                {
                    label: "本月累计（kg）",
                    prop: "synUseMonth",
                    minWidth: '80',
                }
            ]
        },
        {
            label: '废水系统',
            children: [
                {
                    label: "运行时间（h）",
                    prop: "effRunDay",
                    minWidth: '80',
                },
                {
                    label: "本月累计（h）",
                    prop: "effRunMonth",
                    minWidth: '80',
                },
                {
                    label: "处理量（t）",
                    prop: "effTaDay",
                    minWidth: '80',
                },
                {
                    label: "本月累计（t）",
                    prop: "effTaMonth",
                    minWidth: '80',
                },
            ]
        },
        {
            label: '高效絮凝剂',
            children: [
                {
                    label: "本日（kg）",
                    prop: "floUseDay",
                    minWidth: '80',
                },
                {
                    label: "本月累计（kg）",
                    prop: "floUseMonth",
                    minWidth: '80',
                }
            ]
        },
        {
            label:"操作",
            prop:"action",
            solt: true,
            minWidth: '150',
            fixed:true
        }
    ],
}
