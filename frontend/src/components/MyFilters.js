import React, { useRef } from "react";
import { useEffect, useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import { connect } from 'react-redux'
import productsActions from '../redux/actions/productsActions'
import ReactStars from 'react-stars'
import {BiDownArrowAlt, BiUpArrowAlt} from 'react-icons/bi'

const min = 0;
const max = 100000;
let promedio = 0;
let myArray = [];
const MyFilters = (props) => {
  let myCopia = [];
  const {inputSearch, setInputSearch, placeholderStoreInput} = props
  props.productsCurrentStore.map((product) => {
    if (product.reviews.length > 0) {
      promedio = product.reviews.reduce((a, b) => a + b.vote, 0) / product.reviews.length;
    } else {
      promedio = 0;
    }
    myCopia.push({ ...product, miPromedio: promedio });
  });

  

  const [myProducts, setMyProducts] = useState(myCopia);
  const [myProductsAll, setMyProductsAll] = useState(myCopia);
  const [myProductsPrice, setMyProductsPrice] = useState(myCopia);
  const [myPromedio, setMyPromedio] = useState(0);

  const [lowEnd, setLowEnd] = useState(0);
  const [highEnd, setHighEnd] = useState(100000);
  const [averageScores, setAverageScores] = useState([]);

  const handleFilters = (e) => {
    setMyProducts(myCopia);

    let newArrayProducts = [];
    switch (e) {
      case "hf":
        newArrayProducts = myProducts.slice().sort((a, b) => b.price - a.price);
        setMyProducts(newArrayProducts);
        
        break;
      case "lf":
        newArrayProducts = myProducts.slice().sort((a, b) => a.price - b.price);
        setMyProducts(newArrayProducts);
        
        break;
      case "rPrice":
        /*  debugger; */
        if (lowEnd == "" && highEnd == "") {
          setLowEnd(min);
          setHighEnd(max);
          newArrayProducts = myProductsAll.filter((product) => {
            return product.price >= min && product.price <= max;
          });
        } else {
          newArrayProducts = myProductsAll.filter((product) => {
            return product.price >= lowEnd && product.price <= highEnd;
          });
        }
        setMyProducts(newArrayProducts);
        setMyProductsPrice(newArrayProducts);
        props.filterProductsByMyFilter(newArrayProducts, inputSearch);
        textInput1.current.checked =
          textInput2.current.checked =
          textInput3.current.checked =
          textInput4.current.checked =
          textInput5.current.checked =
          false;
        setAverageScores([]);
        break;

      /*  default:
        return "foo"; */
    }

    if (typeof e == "number") {

      let averageScoresAux = averageScores;

      if (averageScoresAux.includes(e)) {
        averageScoresAux = averageScoresAux.filter(aReviewAux => {
          return aReviewAux !== e
        })
      } else {
        averageScoresAux.push(e);
      }
      setAverageScores(averageScoresAux);

      if (averageScoresAux.length === 0) {
        averageScoresAux = [0, 1, 2, 3, 4, 5]
      }

      newArrayProducts = myCopia.filter((product) => {
        return averageScoresAux.includes(Math.round(product.miPromedio));
      });

      setMyProducts(newArrayProducts);
      if (averageScoresAux.length == 0) {
        setMyProducts(myProductsPrice);
      }
    }

    props.filterProductsByMyFilter(newArrayProducts, inputSearch);

  };
  const textInput1 = useRef(),
    textInput2 = useRef(),
    textInput3 = useRef(),
    textInput4 = useRef(),
    textInput5 = useRef();

  const newStar = (initialV) => {
    return (
      <ReactStars
        count={5}
        size={25}
        isHalf={false}
        edit={false}
        color2="#EA957F"
        color1="#555555"
        value={initialV}
      />
    )
  }

  return (
      <div className="contenedorFiltrosProducts">
        <div className="contenedorInfoFiltros">
          <h2>FILTERS</h2>
          <div className="borderFilter"></div>
          <div className="contenedorFindProductStore">
            <input
              type="text"
              className="inputSearchStore"
              placeholder={placeholderStoreInput}
              name=""
              id="buscar"
              autoComplete="off"
              onChange={(e) => {
                props.filterProductsCurrentStore(e.target.value);
                setInputSearch(e.target.value);
              }}
            />
            <span className="material-icons-outlined iconSearchStore">search</span>
          </div>
          
          <div className="contenedorFiltroPrecio">
            <h3>sort by price:</h3>
            <div onClick={() => {handleFilters("lf")}} className="priceFilter">
              <span className="lowest">LOWEST <BiDownArrowAlt className="arrowPrice"/></span>
            </div>
            <div onClick={(e) => {handleFilters("hf")}} className="priceFilter">
              {/* ▲ */}
              <span>HIGHEST <BiUpArrowAlt className="arrowPrice"/></span>
            </div>
          </div>
          {/* {lowEnd > highEnd && <div>enter a valid price range</div>} */}
          <div className="custumerOpinions">
              {/* <div>by opinions of Customers</div> */}
              <h3>sort by customers opinions:</h3>
            <div>
              <input type="checkbox" id={"Z"} onClick={() => { handleFilters(5)}} name={"Z"} ref={textInput5} className="inputCheck"></input>
              <label htmlFor={"Z"}>{newStar(5)}</label>
            </div>

            <div>
              <input
                type="checkbox"
                id={"Z"}
                onClick={() => {
                  handleFilters(4);
                }}
                className="inputCheck"
                name={"Z"}
                ref={textInput4}
              ></input>
              <label htmlFor={"Z"}>{newStar(4)}</label>
            </div>

            <div>
              <input
                type="checkbox"
                id={"Z"}
                onClick={() => {
                  handleFilters(3);
                }}
                className="inputCheck"
                name={"Z"}
                ref={textInput3}
              ></input>
              <label htmlFor={"Z"}>{newStar(3)}</label>
            </div>

            <div>
              <input
                type="checkbox"
                id={"Z"}
                onClick={() => {
                  handleFilters(2);
                }}
                className="inputCheck"
                name={"Z"}
                ref={textInput2}
              ></input>
              <label htmlFor={"Z"}>{newStar(2)}</label>
            </div>

            <div>
              <input
                type="checkbox"
                id={"Z"}
                onClick={() => {
                  handleFilters(1);
                }}
                className="inputCheck"
                name={"Z"}
                ref={textInput1}
              ></input>
              <label htmlFor={"Z"}>{newStar(1)}</label>
            </div>

          </div>
        </div>
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filterProductCurrentStore: state.productReducer.filterProductCurrentStore,
    productsCurrentStore: state.productReducer.productsCurrentStore,
  };
};

const mapDispatchToProps = {
  filterProductsByMyFilter: productsActions.filterProductsByMyFilter,
  filterProductsCurrentStore: productsActions.filterProductsCurrentStore,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyFilters);
