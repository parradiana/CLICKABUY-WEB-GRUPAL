import { connect } from "react-redux";
import cartActions from "../redux/actions/cartActions";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import productsActions from "../redux/actions/productsActions";
import ReactStars from 'react-stars'
import { showToast } from '../helpers/myToast'

const Product = ({ product, likeProduct, userLogged }) => {
  const { stock, nameProduct, price, productImg, userLiked, reviews } = product;
  const [loadingHeart, setLoadingHeart] = useState(true);

  const likes = async () => {
    if (!userLogged) {
      showToast('error', "You must be logged in to save the post in favorites")
    } else {
      setLoadingHeart(false);
      likeProduct(userLogged.token, product._id);
      setLoadingHeart(true);
    }
  };

  let ratingCounter = 0;

  reviews.forEach((rating) => {
    ratingCounter = ratingCounter + rating.vote;
  });
  var starsValue = ratingCounter / reviews.length;

  return (
    <div className="cardProduct">
      <div style={{ backgroundImage: `url('${productImg && productImg.url}')` }} className="productImg"></div>
      <div className="cardProductInfo">
        <h3>{nameProduct}</h3>
        <p>Price: ${price}</p>
        <p>Stock: {stock}</p>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: 40 }}>
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
      </div>
      <div onClick={loadingHeart ? likes : null} className="contenedorIconoCorazon">
        {userLogged && userLiked.includes(userLogged.email) ? (
          <FaHeart className="iconoCorazon" />
        ) : (
          <FaRegHeart className="iconoCorazon" />
        )}
      </div>
      <Link to={`/product/${product._id}`}>
        <button className="buttonAddProduct">View More</button>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
    userLogged: state.authReducer.userLogged,
  };
};
const mapDispatchToProps = {
  addProductToCart: cartActions.addProductToCart,
  deleteProductFromCart: cartActions.deleteProductFromCart,
  likeProduct: productsActions.likeProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
