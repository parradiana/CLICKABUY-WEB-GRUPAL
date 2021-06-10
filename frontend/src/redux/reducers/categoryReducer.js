const initialState = {
    stores: [],
    categories: [],
    currentCategory: null
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STORES_BY_CATEGORY':
            return {
                ...state,
                stores: action.payload
            }
        case 'FETCH_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            }
        case 'CURRENT_CATEGORY':
            return {
                ...state,
                currentCategory: state.categories.find(category => category._id === action.payload.id),
                stores: action.payload.stores
            }
        default:
            return state
    }
}

export default categoryReducer