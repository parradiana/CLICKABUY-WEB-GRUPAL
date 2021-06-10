import { useEffect, useState } from "react"
import { connect } from "react-redux"
import Header from '../components/Header'
import Reviews from "../components/Reviews"
import cartActions from "../redux/actions/cartActions"
import productsActions from "../redux/actions/productsActions"
import Footer from '../components/Footer'
import { FaHeart, FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { showToast } from '../helpers/myToast'

import ReactStars from 'react-stars'

const ProductPage = (props) => {
    const { products, cart, addProductToCart, deleteProductFromCart, userLogged, likeProduct, increaseQuantity } = props
    const idOfProduct = props.match.params.id

    const productSelected = products.find(product => product._id === idOfProduct)
    const [reviews, setReviews] = useState(productSelected.reviews)
    const [loadingHeart, setLoadingHeart] = useState(true);

    const pagosArray = [
        { id: 1, imagePagos: "https://webdesing881317710.files.wordpress.com/2021/05/paypal.png" },
        { id: 2, imagePagos: "https://webdesing881317710.files.wordpress.com/2021/05/mercadopago.png" },
        { id: 3, imagePagos: "https://webdesing881317710.files.wordpress.com/2021/05/visa.png" },
        { id: 4, imagePagos: "https://webdesing881317710.files.wordpress.com/2021/05/americanexpress.png" },
        { id: 5, imagePagos: "https://webdesing881317710.files.wordpress.com/2021/05/mastercard.png" }
    ]

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const likes = async () => {
        if (!userLogged) {
            alert("no podes likear");
        } else {
            setLoadingHeart(false);
            likeProduct(userLogged.token, productSelected._id);
            setLoadingHeart(true);
        }
    };

    let ratingCounter = 0


    productSelected.reviews.forEach(rating => {

        ratingCounter = ratingCounter + rating.vote
    })
    let starsValue = ratingCounter / productSelected.reviews.length

    return (
        <>
            <Header />
            <div className="myStoreBackTitle">
                <div onClick={props.history.goBack} style={{ cursor: 'pointer' }} className="backToHome"><span className="material-icons-outlined iconBack">arrow_back_ios_new</span> Back</div>
            </div>
            <div className="productPageContainer">
                <div className="productPageCard" >
                    <div className="productPageCardInfo">
                        <div style={{ backgroundImage: `url(${productSelected.productImg && productSelected.productImg.url})` }} className="productPageImg" ></div>
                        <div className="productPageTitlePrice">
                            <div className="productPageTitle" >
                                <span>{productSelected.nameProduct}</span>
                                <div onClick={loadingHeart ? likes : null} className="contenedorIconoCorazon">
                                    {userLogged && productSelected.userLiked.includes(userLogged.email) ? (
                                        <FaHeart className="iconoCorazon2" />
                                    ) : (
                                        <FaRegHeart className="iconoCorazon2" />
                                    )}
                                </div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: 30 }}>
                                <ReactStars
                                    count={5}
                                    size={32}
                                    isHalf={true}
                                    edit={false}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    color2="#EA957F"
                                    color1="#555555"
                                    value={starsValue}
                                />
                                <span
                                    style={{
                                        fontSize: 12,
                                        verticalAlign: "center",
                                        marginTop: 5,
                                        marginLeft: 5,
                                        color: "#777777",
                                        fontWeight: "lighter",
                                    }}
                                >
                                    ({reviews.length})
          </span>
                            </div>
                            <div className="productPagePrice">
                                <span>$ {(productSelected.price).toFixed(2)}</span>
                            </div>
                            <p>{productSelected.description}</p>
                            <div className="productPageStock">
                                {
                                    productSelected.stock < 10
                                        ? <span>Last {productSelected.stock} units</span>
                                        : <span>{productSelected.stock} stock</span>
                                }
                            </div>
                            <div className="contenedorQuantity">
                                {cart.map(item => {
                                    return (
                                        <div className="contenedorButtonQuantity">
                                            <button onClick={() => increaseQuantity(productSelected._id, -1)} disabled={productSelected.quantity <= 1} className="buttonAccionProductPage">-</button>
                                            {item.quantity}
                                            <button onClick={() => increaseQuantity(productSelected._id, 1)} disabled={productSelected.quantity >= productSelected.stock} className="buttonAccionProductPage">+</button>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="contenedorButtonsProductCart">
                                {cart.find(item => item._id === productSelected._id)
                                    ?
                                    <button className="buttonRemoveProduct" onClick={() => { deleteProductFromCart(productSelected); showToast("success", "Product deleted from cart") }}><FaTrashAlt /></button>
                                    : <div className="contenedorButtonAccionCart">
                                        <button className="buttonAddProduct2" onClick={() => { addProductToCart(productSelected); showToast("success", "Added to cart") }}>ADD TO CART</button>
                                        <Link to="/finalizepurchase"><button className="buttonBuyNow" onClick={() => { addProductToCart(productSelected); showToast("success", "Added to cart") }}>BUY NOW</button></Link>
                                    </div>
                                }
                            </div>
                            <div className="contenedorPaymentMethods">
                                <span>Payment Methods</span>
                                <div className="borderClass"></div>
                                <div className="pagosArrayProductPage">
                                    {
                                        pagosArray.map(elemento => {
                                            return <div key={elemento._id} style={{ backgroundImage: `url('${elemento.imagePagos}')` }} className="imagePagos"></div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <Reviews product={productSelected._id} reviews={reviews} setReviews={setReviews} productSelected={productSelected} />
                </div>
            </div>
            <Footer />
        </>
    )
}

const mapStateToProps = state => {
    return {
        products: state.productReducer.products,
        cart: state.cartReducer.cart,
        userLogged: state.authReducer.userLogged
    }
}

const mapDispatchToProps = {
    getProductsFromStore: productsActions.getProductsFromStore,
    addProductToCart: cartActions.addProductToCart,
    deleteProductFromCart: cartActions.deleteProductFromCart,
    likeProduct: productsActions.likeProduct,
    increaseQuantity: cartActions.increaseQuantity
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage)

