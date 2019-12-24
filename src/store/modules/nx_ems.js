const nx_ems = {
    state:{
        row:{},
        isSucess:false,
        query:{}
    },
    mutations:{
        SET_ROW(state,data){
            state.row = data
        },
        SET_ISSUCESS(state,data){
            state.isSucess = data
        },
        SET_QUERY(state,data){
            state.query = data
        }
    }
}
export default nx_ems