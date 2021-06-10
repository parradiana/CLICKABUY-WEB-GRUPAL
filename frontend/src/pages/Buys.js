import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import PurchaseDetail from '../components/PurchaseDetail'
import { connect } from 'react-redux'
import cartActions from '../redux/actions/cartActions'
import { Link } from 'react-router-dom'
import { showToast } from '../helpers/myToast'
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'
// const MySwal = withReactContent(Swal)

const Buys = ({ cart, clearCart }) => {
    // MySwal.fire({
    //     title: 'Are you sure you want to cancel this order?',
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonText: 'Yes, cancel it!',
    //     cancelButtonText: 'No, keep it'
    //   }).then((result) => {
    //     if (result.value) {
    //         MySwal.fire(
    //         'Order cancelled!',
    //         'success'
    //       ).then(
    //         clearCart()
    //       )
    //     } 
    //   })

    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

    return (
        <>
            <Header/>
            <div className='contenedorPrincipal'>
                <div className='contenedorCarrito'>
                    <h3>My Cart</h3>
                    {cart.map(item=>{
                        return <PurchaseDetail itemCart ={item}/>
                    })}
                    <h2>Total = ${cart.reduce((total,item)=>total+=item.quantity*item.price ,0).toFixed(2)}</h2> 
                    <div className="contenedorButtonsOrder">
                        <button onClick={()=> {clearCart(); showToast('success', 'Order cancelled!')}} className="buttonCancelOrder">Cancel Order</button>
                        <Link to="/finalizepurchase" className="buttonReady">Ready</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.cartReducer.cart
    }
}

const mapDispatchToProps = {
    clearCart: cartActions.clearCart
}
//clearCart
export default connect(mapStateToProps, mapDispatchToProps)(Buys)