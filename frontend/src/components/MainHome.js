import { useEffect } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import productsActions from "../redux/actions/productsActions"
import Fade from 'react-reveal/Fade';

const MainHome = (props) => {
    const { products } = props
    useEffect(() => {
        props.getAllProducts()
    }, [])

    const productsFiltered = products.filter((product, index) => index <= 3)

    return (
        <>
            <div className="contenedorPublicity">
                <Fade left>
                    {/* <h1>sofi la mas kpa</h1> */}
                    <div style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/05/new-incomes.png')" }} className="imagePublicity">
                        {/* <Link to="/category"></Link> */}
                        <button className="buttonPulicity1"><p>CHECK IT OUT!</p></button>
                    </div>
                </Fade>
                <Fade right>
                    {/* <h1>sofi la mas kpa</h1> */}
                    <div style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/05/new-incomes-1.png')" }} className="imagePublicity2">
                        {/* <Link></Link> */}
                        <button className="buttonPulicity2"><p>CHECK IT OUT!</p></button>
                    </div>
                </Fade>
            </div>
            <div className="contenedorFlashDeals">
                <h3>New Releases</h3>
                <div className="contenedorflashDealsInfo">
                    {
                        productsFiltered.map(product => {
                            return (
                                <div key = {product._id} className="productHome">
                                    <div style={{ backgroundImage: `url('${product.productImg.url}')` }} className="imageProductHome">
                                        <span className="descuentoHome">NEW!</span>
                                    </div>
                                    <div className="productHomeInfo">
                                        <span>{product.nameProduct}</span>
                                        <span>${product.price}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="contenedorDownload">
                <div>
                    <div className="downloadAppInfo">
                        <p>Download clickabuy app</p>
                        <p>for a better experience.</p>
                        <div>
                        <div style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/06/google-play.png')" }} className="downloadApp"></div>
                        <div style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/06/app-store.png')" }} className="downloadApp"></div>
                        </div>
                    </div>
                    {/* <img src="https://webdesing881317710.files.wordpress.com/2021/05/downloadclickabuy.png" alt="" className="phone"/> */}
                    {/* <div className="relative"> */}
                    <div style={{ backgroundImage: "url('https://webdesing881317710.files.wordpress.com/2021/06/gif2.gif')" }} className="gifDownload"></div>
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
        products: state.productReducer.products,
    }
}
const mapDispatchToProps = {
    getAllProducts: productsActions.getAllProducts

}
export default connect(mapStateToProps, mapDispatchToProps)(MainHome)