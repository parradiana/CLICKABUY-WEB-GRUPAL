const initialState = {
    loading = true
}
const loadingReducer = (state = initialState, action) => {
    switch(action.type){       
        case 'ANIMATION_STATE':
            return {
                loading: action.payload
        } 
        default:
            return state;
    }
}
export default loadingReducer