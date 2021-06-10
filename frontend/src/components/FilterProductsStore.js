import React from 'react'
import productsActions from '../redux/actions/productsActions'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Product from './Product'
/* import categoryActions from '../redux/actions/categoryActions' */
import storeActions from '../redux/actions/storeActions'
import { useEffect } from 'react'

const FilTerProductsStore = (props) => {
    useEffect(() => {
        if (props.products.length === 0)
            props.getAllProducts()
    }, []);

    return (
        <>
            <Header />
            <div className="contenedorPageProductsFilter">
                <div className="contenedorCardProductsFilter">
                    {/* <div className="contenedorBuscadorProductsFilter">
                        <input className='filtroHome' type="Buscar" name="" id="buscar" placeholder="What product are you looking for?" onChange={(e) => { props.filtrar(e.target.value) }} />
                        <span className="material-icons-outlined iconSearchHome">search</span>
                    </div> */}
                    <div className="containerCards">
                        {props.filterProducts.length === 0
                            ? <div> <h2>No products</h2> </div>
                            : props.filterProducts.map(product => {
                                return (
                                    <div key={product._id}>
                                        {/* <p>Tienda: <NavLink to={`/store/${product.storeId}`}>{product.storeId}</NavLink> </p> */}
                                        <Product product={product} />
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}
const mapStateToProps = state => {
    return {
        filterProducts: state.productReducer.filterProducts,
        products: state.productReducer.products
    }
}

const mapDispatchToProps = {
    filtrar: productsActions.filterProducts,
    getAllProducts: productsActions.getAllProducts,
}
export default connect(mapStateToProps, mapDispatchToProps)(FilTerProductsStore)