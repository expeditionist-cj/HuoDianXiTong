const summary = {
    state:{
        tableData:[],
        tableDataXq:[],
        isBtnDisabled:false
    },
    mutations:{
        SET_TABLEDATA(state,data){
            state.tableData = data;
        },
        SET_TABLEDATAXQ(state,data){
            state.tableDataXq = data;
        },
        SET_ISBTNDISABLED(state,data){
            state.isBtnDisabled = data;
        }
    }
}
export default summary