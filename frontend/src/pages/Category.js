import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import ReactStars from 'react-stars'
import categoryActions from '../redux/actions/categoryActions'
import Header from '../components/Header'
import Footer from '../components/Footer'
import storeActions from '../redux/actions/storeActions'
import Lottie from 'react-lottie'
import animationData from '../lotties/clickabuy-loader.json'

const Category = (props) => {
    const { currentCategory, getCurrentCategory, storesForCategory, getAllCategories } = props
    const idParams = props.match.params.id
    
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    if (!currentCategory) {
        getAllCategories()
        getCurrentCategory(idParams)
        return <div className="clickabuyLoader">
            <Lottie
                options={defaultOptions}
                // height={657}
                // width={1365}
                // speed={0}
            />
        </div>
    }

    return (
        <>
            <Header />
            <div className="categoryContainer">
                <div className="categoryHeroImage" style={{ backgroundImage: `url('${currentCategory.bannerCategory}')` }}>
                    <div className="contenedorNameCategoryHero">
                        <div>
                            <span className="nameCategoryHero1">category</span>
                            <span className="nameCategoryHero2">{currentCategory.nameCategory}</span>
                        </div>
                    </div>
                </div>
                <div className="categoryStoresContainer">
                    <span>STORES</span>
                    <div className="categoryStoresSection">
                        {
                            storesForCategory.length === 0
                                ? <span style={{display:'flex', justifyContent:'center', alignItems:'center'}}>There are no stores yet</span>
                                : storesForCategory.map((store, i) => {
                                    let ratingCounter = 0

                                    store.rate.forEach(rating => {
                                        ratingCounter = ratingCounter + rating.vote
                                    })
                                    let starsValue = ratingCounter / store.rate.length

                                    return (
                                        <NavLink to={`/store/${store._id}`} className="linkStore categoryStoresCards" key={i} >
                                            <div>
                                                <div style={{ backgroundImage: `url('${store.logoStore.url}')` }} className="logoStoreCategory"></div>
                                                {/* <div style={{ backgroundImage: `url('../assets/${store.logoStore}')` }} className="logoStoreCategory"></div> */}
                                                <span className="nameStoresCards">{store.nameStore}</span>
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 40 }}>
                                                    <ReactStars
                                                        count={5}
                                                        size={32}
                                                        isHalf={true}
                                                        edit={false}
                                                        color2="#EA957F"
                                                        color1="#555555"
                                                        value={starsValue}
                                                    />
                                                    < span style={{ fontSize: 12, verticalAlign: 'center', marginTop: 5, marginLeft: 5, color: '#777777' }} >({store.rate.length})</span>
                                                </div>
                                                <span className="nameCategoryStoresCards">{currentCategory.nameCategory}</span>
                                            </div>
                                        </ NavLink>
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
        categories: state.categoryReducer.categories,
        storesForCategory: state.categoryReducer.stores,
        currentCategory: state.categoryReducer.currentCategory,
        userLogged: state.authReducer.userLogged

    }
}

const mapDispatchToProps = {
    getStoresbByCategory: categoryActions.getStoresbByCategory,
    getCurrentCategory: categoryActions.getCurrentCategory,
    rateStore: storeActions.rateStore,
    getAllCategories: categoryActions.getAllCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)