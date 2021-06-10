import { connect } from 'react-redux'
import '../css/jona.css'
import { Link, NavLink } from 'react-router-dom'
import Header from '../components/Header'
import adminStoreActions from '../redux/actions/adminStoreActions'
import { useEffect, useState } from 'react'
import ReactStars from "react-rating-stars-component"



const MyStore = (props) => {

    const { userLogged, getStoresByUser, storesByUser, preloaderStore, cleanStores } = props

    useEffect(() => {
        getStoresByUser(userLogged.token)
        // return () => cleanStores()
    }, [])

    return (
        <>
            <Header />
            <div className="myStoreContainer">


                <div className="myStoresHeader">
                    <div onClick={props.history.goBack} style={{ cursor: 'pointer' }} className="backToHome"><span className="material-icons-outlined iconBack">arrow_back_ios_new</span> Back</div>
                    <span className="myStoresTitle" >YOUR STORES</span>
                </div>
                <div className="containerOfItemsMyStores">
                    <Link to="SignUpStore" className="categoryStoresCards storeCardsAdmin" style={{ backgroundColor: '#ffffff' }}>
                        <span style={{ fontSize: 25, color: '#000000' }}>ADD NEW STORE</span>
                        <span style={{ fontSize: 40, color: '#000000' }}>+</span>
                    </Link>
                    {
                        preloaderStore
                            ? <div className="prelaoderContainerStore">
                                <div className="lds-ripple"><div></div><div></div></div>
                            </div>
                            : storesByUser.length === 0
                                ? <span>You dont have any store yet.</span>
                                : storesByUser.map((store, i) => {
                                    let ratingCounter = 0

                                    store.rate.forEach(rating => {
                                        ratingCounter = ratingCounter + rating.vote
                                    })
                                    let starsValue = ratingCounter / store.rate.length

                                    return (
                                        <Link to={`/myStore/${store._id}`} className="linkStore categoryStoresCards" key={i} >
                                            <div>
                                                <div style={{ backgroundImage: `url('${store.logoStore.url}')` }} className="logoStoreCategory"></div>
                                                <span className="nameStoresCards">{store.nameStore}</span>
                                                {/* <span className="nameCategoryStoresCards">STARTS</span> */}
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 40 }}>
                                                    <ReactStars
                                                        count={5}
                                                        size={32}
                                                        isHalf={true}
                                                        edit={false}
                                                        emptyIcon={<i className="far fa-star"></i>}
                                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                        fullIcon={<i className="fa fa-star"></i>}
                                                        activeColor="#ffd700"
                                                        // activeColor="#48d1be"
                                                        color="#999999"
                                                        value={starsValue}
                                                    />
                                                    < span style={{ fontSize: 12, verticalAlign: 'center', marginTop: 5, marginLeft: 5, color: '#777777' }} >({store.rate.length})</span>
                                                </div>
                                                {/* <span className="nameCategoryStoresCards">{currentCategory.nameCategory}</span> */}
                                            </div>
                                        </ Link>
                                    )
                                })
                    }
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        userLogged: state.authReducer.userLogged,
        storesByUser: state.adminStoreReducer.storesByUser,
        preloaderStore: state.adminStoreReducer.preloaderStore
    }
}

const mapDispatchToProps = {
    getStoresByUser: adminStoreActions.getStoresByUser,
    cleanStores: adminStoreActions.cleanStores

};

export default connect(mapStateToProps, mapDispatchToProps)(MyStore);



