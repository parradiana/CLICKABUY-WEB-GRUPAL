import axios from 'axios'
import API from "../../helpers/api";
import { showToast } from '../../helpers/myToast';


const productsActions = {
    getProductsFromStore: (idStore) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get(API + '/productsFromStore/' + idStore)
                dispatch({ type: 'FETCH_PRODUCTS_STORE', payload: response.data.response })
            } catch (error) {
                console.log(error)
            }
        }
    },
    getAllProducts: () => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get(API + '/products')
                dispatch({ type: 'FETCH_ALL_PRODUCTS', payload: response.data.response })
            } catch (error) {
                console.log(error)
            }
        }
    },
    filterProducts: (value) => {
        return (dispatch, getstate) => {

            dispatch({ type: 'FILTER_PRODUCTS', payload: value })
        }
    },
    filterProductsCurrentStore: (value) => {
        return (dispatch, getstate) => {
            dispatch({ type: 'FILTER_PRODUCTS_CURRENT_STORE', payload: value })
        }
    },

    likeProduct: (token, idProduct) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put(API + '/likeproduct', { idProduct }, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                // console.log(response.data.response)
                dispatch({ type: 'UPDATE_PRODUCT_OF_ALL_PRODUCTS', payload: response.data.response })
                //dispatch({type: 'UPDATE_CURRENT_STORE', payload: response.data.response})
                // return response.data.response
            } catch (error) {
                console.log(error)
            }
        }
    },
    addReview: (inputreview, id) => {
        var review = inputreview.review
        var vote = inputreview.vote
        return async (dispatch, getState) => {
            try {
                const response = await axios.post(API + '/reviews/' + id, { review, vote }, {
                    headers: {
                        'Authorization': 'Bearer ' + inputreview.token
                    }
                })
                return response.data.response
            } catch (error) {
                console.log(error)
            }
        }
    },
    editReview: (idProduct, review, idReview) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put(API + '/reviews/' + idProduct, { review, idReview })
                return response.data.response.reviews
            } catch (error) {
                console.log(error)
            }
        }
    },
    deleteReview: (idProduct, idReview) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.delete(API + '/reviews/' + idProduct, {
                    data: {
                        idReview: idReview
                    }
                })
                return response.data.response
            } catch (error) {
                console.log(error)
            }
        }
    },
    rateProduct: (productId, numberRate, token) => {
        return (dispatch) => {

            try {
                const response = axios.put(API + '/productRate/' + productId, { numberRate }, {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
            } catch (err) {
                console.log(err);
                // showTostError500();
            }
        };
    },
    filterProductsByMyFilter: (productFiltered, inputSearch) => {
        return (dispatch) => {
            dispatch({ type: "UPDATE_PRODUCT_MY_FILTER", payload: { productFiltered, inputSearch } })
        }
    },
    getProductById:(idProduct) => {
        return async (dispatch)=> {
            
            try {
                const {data} = await axios.get(API + '/product/' + idProduct, )
                
                if(data.success)
                    return data.response;
                else
                    showToast("error",data.error)
            } catch (error) {
                console.log(error)
            }
        }
    }
}
export default productsActions