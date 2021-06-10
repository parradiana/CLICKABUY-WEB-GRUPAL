import React from 'react'
import cartActions from '../redux/actions/cartActions'
import {connect} from 'react-redux'
// import {showToast} from '../helpers/myToast'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const PurchaseDetail = ({itemCart,deleteProductFromCart,increaseQuantity})=> {
    alert = () => {
        MySwal.fire({
            title: 'Are you sure you want to delete this product?',
            // text: 'You will not be able to recover this comment!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.value) {
                MySwal.fire(
                'Product deleted from cart!',
                // 'Product deleted from cart',
                'success'
              ).then(
                deleteProductFromCart(itemCart)
              )
            } 
          })
        //   else if (result.dismiss === Swal.DismissReason.cancel) {
        //     MySwal.fire(
        //     'Cancelled',
        //     'Your comment is safe :)',
        //     'error'
        //   )
        // }
        //   ; showToast("success", "Product deleted from cart")}
    }
    return(
        <div className='detailContainer'>
            <div style={{backgroundImage: `url('${itemCart.productImg.url}')`}} className="productImageCarrito"></div>
            <div className="nameProductCarrito">
                <span>{itemCart.nameProduct}</span>
                <span onClick={()=> alert()} className="deleteProductCarrito">Delete</span>
            </div>
            <div className='quantityContainer'>
                <button onClick={()=>increaseQuantity(itemCart._id,-1)} disabled={itemCart.quantity<=1} className="buttonAccionProducto">-</button>
                {itemCart.quantity}
                <button onClick={()=>increaseQuantity(itemCart._id,1)} disabled={itemCart.quantity>=itemCart.stock} className="buttonAccionProducto">+</button>
            </div>
            <p>$USD {itemCart.quantity * itemCart.price}</p>
        </div>
    )
}
const mapDispatchToProps = {
    deleteProductFromCart : cartActions.deleteProductFromCart,
    increaseQuantity: cartActions.increaseQuantity
}

export default connect(null,mapDispatchToProps)(PurchaseDetail)