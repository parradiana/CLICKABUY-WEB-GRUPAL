import { connect } from "react-redux"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Paypal from "../components/Paypal"
import Modal from 'react-modal'
import { useState } from "react"
// import Cards from 'react-credit-cards';

import PaymentForm from "../components/PaymentForm"


const FinalizePurchase = (props) => {
    const { cart } = props
    const [show, setShow] = useState(false)
    const [nameModal, setNameModal] = useState("payment")
    const [cards, setCards] = useState({ cvc: '', expiry: '', focus: '', name: '', number: '' })
    let display = !show ? 'none' : 'flex'
    let total = cart.reduce((total, item) => total += item.quantity * item.price, 0).toFixed(2)
    return (
        <>
            <Header />
            <div className="contenedorPrincipal">
                <div className="contenedorCarrito">
                    <h1>PURCHASE SUMMARY</h1>
                    <div className="borderSummary"></div>
                    {cart.map(item => {
                        return (
                            <div key={item._id} className="detailFinalizePurchase">
                                <div style={{ backgroundImage: `url('${item.productImg.url}')` }} className="productImageCarrito"></div>
                                <div className="nameProductCarrito">
                                    <span>{item.nameProduct}</span>
                                </div>
                                <span>QTY: {item.quantity}</span>
                                <p>$ {item.price}</p>
                                {/* <h3></h3> */}
                            </div>
                        )
                    })}
                    <h2>Total = ${total}</h2>
                    <div className="contenedorPasarelaPago">
                        <button onClick={() => setShow(!show)} className="buttonCreditCardModal">Credit/Debit Card</button>
                        Or
                        <Paypal buy={{ cart: cart, total: total }} />
                    </div>
                    <Modal
                        isOpen={show}
                        onRequestClose={() => {setShow(!show); setNameModal("payment")}}
                        contentLabel="Example Modal"
                        className="ModalComponent"
                        overlayClassName="OverlayModal"
                    >
                        <div id="modal" style={{ display: display }}>
                            <div style={{ display: "flex" }}>
                                <span className="material-icons-outlined closeModal" onClick={() => {setShow(false); setNameModal("payment")}}>close</span>
                            </div>
                            <div className="creditCardModal">
                                {nameModal !== "payment"
                                ? <div className="orderCompleted">
                                    <div className="imgOrderCompleted" style={{backgroundImage:"url('https://webdesing881317710.files.wordpress.com/2021/06/invoice-3597241-3010221.png')"}}></div>
                                    <h1>Your order is completed!</h1>
                                    <span>Thanks for shopping in clickabuy</span>
                                    <span>We will send you a confirmation email, including the summary of your purchase.</span>
                                </div>
                                : <PaymentForm buy={{ cart: cart, total: total }} setNameModal={setNameModal}/>
                                }
                            </div>
                        </div>
                    </Modal>
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
export default connect(mapStateToProps)(FinalizePurchase)
// AZb7ZN7IChYro2ZU-EMComszFSLVZfMRM3BUysWQ-MNv3SzK-KZVusG6om9Q8zFMH4E7thAkzxpR88QR
//BUSSINES
// sb-q0qay5870639@business.example.com
// System Generated Password:
// {y#+ux8U
//PERSONAL
// sb-v45u16418014@personal.example.com
// System Generated Password:
// 8C<yTx1P

