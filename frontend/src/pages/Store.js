import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Product from "../components/Product";
import productsActions from "../redux/actions/productsActions";
import ReactStars from 'react-stars'
import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import storeActions from "../redux/actions/storeActions";
import MyFilters from "../components/MyFilters";

let promedio = 0;
/* let myCopia = []; */

const Store = (props) => {
  const { getProductsFromStore, storesForCategory } = props;
  const idParams = props.match.params.id;
  const [store, setStore] = useState({ rate: [] });
  const [stars, setStars] = useState(0);
  const [ver, setVer] = useState(false);
  const [cantRate, setCantRate] = useState(store.rate.length);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    !storesForCategory.length
      ? props.history.push('/')
      : setStore(storesForCategory.find((store) => store._id === idParams));
    getProductsFromStore(idParams);
  }, []);
  useEffect(() => {
    let ratingCounter = 0;
    let starsValue = 0;
    store.rate.forEach((rating) => {
      let numberOfRate = rating.vote || 0;
      ratingCounter = ratingCounter + numberOfRate;
    });
    let numberForDividir = 0;
    if (store.rate.length > 0) {
      numberForDividir = store.rate.length;
    }
    starsValue = ratingCounter / numberForDividir;
    setStars(starsValue);
    if (!isNaN(starsValue)) {
      setVer(true);
      setCantRate(store.rate.length);
    }
  }, [store]);

  useEffect(() => {
    return () => {
      props.filterProductsCurrentStore("")
    }
  }, [])

  const ratingChanged = (newRating, storeId) => {
    props.rateStore(storeId, newRating, props.userLogged.token);
    setCantRate(cantRate + 1);
  };

  var placeholderStoreInput = `Search products in ${store.nameStore}`;

  let ratingCounter = 0;

  let myCopia = [];

  props.filterProductCurrentStore.map((product) => {
    if (product.reviews.length > 0) {
      promedio = product.reviews.reduce((a, b) => a + b.vote, 0) / product.reviews.length;
    } else {
      promedio = 0;
    }
    myCopia.push({ ...product, miPromedio: promedio });
  });


  return (
    <div className="contenedorStore">
      <Header />
      
      <div style={{ backgroundImage: `url('${store.storeHero && store.storeHero.url}')` }} className="storeHero">
        <div className="contenedorInfoStorePage">
          {/* <div style={{ backgroundImage: `url('../assets/${store.logoStore}')` }} className="storeLogoStore"></div> */}
          <div style={{ backgroundImage: `url('${store.logoStore && store.logoStore.url}')` }} className="storeLogoStore"></div>
          <h1>{store.nameStore}</h1>
          {/* <div className="contenedorFindProductStore">
            <input
              type="text"
              className="inputSearchStore"
              placeholder={placeholderStoreInput}
              name=""
              id="buscar"
              onChange={(e) => {
                props.filterProductsCurrentStore(e.target.value);
                setInputSearch(e.target.value);
              }}
            />
            <span className="material-icons-outlined iconSearchStore">search</span>
          </div> */}
        </div>
      </div>
      
      <div className="myStoreBackTitle">
        <div onClick={props.history.goBack} style={{ cursor: 'pointer' }} className="backToHome"><span className="material-icons-outlined iconBack">arrow_back_ios_new</span> Back</div>
      </div>

      <div className="contenedorInfoCards">
        <div className="contenedorFiltrosStore">
          <div style={{ width: "100%", textAlign: "center", marginTop: 70 }}>
            <span> RATE US </span>
          </div>
          <div className="storeStars">
            {ver ? (
              <ReactStars
                count={5}
                onChange={(e) => ratingChanged(e, store._id)}
                size={32}
                isHalf={true}
                edit={true}
                color2="#EA957F"
                color1="#555555"
                value={stars}
              />
            ) : store.rate.length === 0 ? (
              <ReactStars
                count={5}
                onChange={(e) => ratingChanged(e, store._id)}
                size={32}
                isHalf={true}
                edit={true}
                color2="#EA957F"
                color1="#555555"
                value={0}
              />
            ) : (
              <span>Loading</span>
            )}

            <span style={{ fontSize: 12, verticalAlign: "center", marginTop: 5, marginLeft: 5, color: "#777777" }}>
              ( {store.rate && cantRate} )
              </span>
          </div>

          <div>
            <MyFilters inputSearch={inputSearch} setInputSearch={setInputSearch} placeholderStoreInput={placeholderStoreInput} />
          </div>
        </div>
        <div className="containerCards">
          {props.filterProductCurrentStore.length === 0 ? (
            <div className="noProducts">
              <h2>No products</h2>{" "}
            </div>
          ) : props.filterProductCurrentStore.length == 0 ? (
            props.filterProductCurrentStore.map((product) => {
              return (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              );
            })
          ) : (
            props.filterProductCurrentStore.map((product) => {
              return (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              );
            })
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    storesForCategory: state.categoryReducer.stores,
    products: state.productReducer.products,
    productsCurrentStore: state.productReducer.productsCurrentStore,
    userLogged: state.authReducer.userLogged,
    filterProductCurrentStore: state.productReducer.filterProductCurrentStore
  };
};

const mapDispatchToProps = {
  getProductsFromStore: productsActions.getProductsFromStore,
  filterProductsCurrentStore: productsActions.filterProductsCurrentStore,
  rateStore: storeActions.rateStore,
  getCurrentStore: storeActions.getCurrentStore
};
export default connect(mapStateToProps, mapDispatchToProps)(Store);
