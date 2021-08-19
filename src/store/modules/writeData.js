const writeData = {
    state:{
        selectOptions:{},
        identity: '',
        loading: false
    },
    mutations:{
        SET_SELECTOPTIONS(state,data){
            state.selectOptions = data
        },
        SET_IDENTITY(state,data){
            state.identity = data
        },
        SET_LOADING(state,data){
            state.loading = data
        }
    }
}
export default writeData