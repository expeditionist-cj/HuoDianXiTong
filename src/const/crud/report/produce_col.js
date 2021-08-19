export const tableOption = {
    border: false,
    // stripe: false,
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    align: 'center',
    menu: false,
    refreshBtn: false,
    addBtn: false,
    columnBtn: false,
    size: "small",
    column: [
        {
            label: '项目',
            prop: 'plantCn',
            fixed: true
        },
        {
            label: '机组',
            prop: 'unit',
            fixed: true,
            solt: true,
        },
        {
            label: '发电量',
            children: [
                {
                    label: "负荷率（%）",
                    prop: "loadRate",
                    minWidth: '80',
                    solt: true,
                },
                {
                    label: "发电量（万KWh）",
                    prop: "power",
                    minWidth: '80',
                    solt: true,
                },
                {
                    label: "运行小时（h）",
                    prop: "runTime",
                    minWidth: '80',
                    solt: true,
                },

            ]
        },
        {
            label: '原烟气（mg/Nm³）',
            children: [
                {
                    label: "粉尘",
                    prop: "inDust",
                    minWidth: '80',
                    solt: true,
                },
                {
                    label: "NOx",
                    prop: "inNox",
                    minWidth: '80',
                    solt: true,
                },
                {
                    label: "SO₂",
                    prop: "inSo2",
                    minWidth: '80',
                    solt: true,
                },

            ]
        },
        {
            label: '净烟气（mg/Nm³）',
            children: [
                {
                    label: "粉尘",
                    prop: "outDust",
                    minWidth: '80',
                    solt: true,
                },
                {
                    label: "NOx",
                    prop: "outNox",
                    minWidth: '80',
                    solt: true,
                },
                {
                    label: "SO₂",
                    prop: "outSo2",
                    minWidth: '80',
                    solt: true,
                },

            ]
        },
    ],
}
