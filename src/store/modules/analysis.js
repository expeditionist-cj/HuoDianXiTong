import moment from "moment";
const analysisData = {
    state: {
        analysisDate: moment(),
        analysisProject: ""
    },
    mutations: {
        SET_ANALYSISIDATE(state, date) {
            state.analysisDate = date;
        },
        SET_ANALYSISPROJECT(state, project) {
            state.analysisProject = project;
        }
    }
}
export default analysisData