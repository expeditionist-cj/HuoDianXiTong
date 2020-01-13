const assitantTitle = {
    state: {
        area_plant: '',
        unit: ''
    },
    mutations: {
        SET_AREA_PLANT(state, data) {
            state.area_plant = data
        },
        SET_UNIT(state, data) {
            state.unit = data
        },
        CLEAR_AREA_PLANT(state){
            state.area_plant='';
            state.unit='';
        }
    }
}
export default assitantTitle