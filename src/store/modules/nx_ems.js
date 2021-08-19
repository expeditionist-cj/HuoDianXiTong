const nx_ems = {
    state:{
        row:{},
        isSucess:false,
        query:{},
        isNxSuccess:false
    },
    mutations:{
        SET_ROW(state,data){
            state.row = data
        },
        SET_ISSUCESS(state,data){
            state.isSucess = data
        },
        SET_ISNXSUCCESS(state,data){
            state.isNxSuccess = data
        },
        SET_QUERY(state,data){
            state.query = data
        }
    }
}
export default nx_ems