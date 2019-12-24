// 实时报警tbody 配置
export const ssbjCellStyle =({ row, column, rowIndex, columnIndex })=> {

    if (rowIndex % 2 == 0) {
      if (columnIndex % 2 == 0) {
        return "height:60px;font-size:14px;border-bottom:none;background:#FF819D;color:#fff";
      } else {
        return "height:60px;font-size:14px;border-bottom:none;background:#FF7795;color:#fff";
      }
    } else {
      if (columnIndex % 2 == 0) {
        return "height:60px;font-size:14px;border-bottom:none;background:#EFC114;color:#fff";
      } else {
        return "height:60px;font-size:14px;border-bottom:none;background:#EEBC00;color:#fff";
      }
    }
  }
// 实时报警theader配置
export const ssbjHeader=({ row, column, rowIndex, columnIndex })=> {
    if (columnIndex % 2 == 0) {
      return "height:60px;font-size:14px;border-bottom:none;background:#3998F9;color:#fff";
    } else {
      return "height:60px;font-size:14px;border-bottom:none;background:#2990F9;color:#fff";
    }
};
// 报警提示 theader 配置
export const tipsHeader = ({ row, column, rowIndex, columnIndex })=> {
    return "background:#FC8686;color:#FFFFFF;border-bottom:none";
  };
//  报警提示 tbody 配置
export const tipsCellStyle = ({ row, column, rowIndex, columnIndex })=> {
    if (rowIndex % 2 == 0) {
      return "background:#FF6565;color:#fff;border-bottom:none";
    } else {
      return "background:rgb(252, 134, 134);color:#fff;border-bottom:none";
    }
  };