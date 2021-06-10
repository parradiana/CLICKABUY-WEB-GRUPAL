import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import categoryActions from "../redux/actions/categoryActions"
const CategoriesBanner = (props) => {
    const { categories, getCurrentCategory } = props
    const [show, setShow] = useState(false)
    let display = !show ? 'none' : 'flex'
    const firstCategories = categories.filter((category, index) => index < 5)
    const secondCategories = categories.filter((category, index) => index >= 5)

    return (
        <div className="contenedorCategoriesBanner">
            <div className="contenedorCategories">
                <h2>What are you looking for?</h2>
                <div className="flexCategories">
                    {
                        firstCategories.map(category => {
                            return (
                                <div key={category._id} onClick={() => getCurrentCategory(category._id)} className="category">
                                    <Link to={`/category/${category._id}`} className="nameCategoryBanner">
                                        <div className="imageCategoryBanner" style={{ backgroundImage: `url('${category.imageCategory}')` }}></div>
                                    </Link>
                                        <span className="nameCategorySpan">{category.nameCategory}</span>
                                </div>
                            )
                        })

                    }
                    <div className="category" onClick={() => setShow(!show)}>
                        <span className="material-icons-outlined iconViewMore">grid_view</span>
                        <span>View More</span>
                    </div>
                    <Modal
                        isOpen={show}
                        onRequestClose={() => setShow(!show)}
                        contentLabel="Example Modal"
                        className="ModalComponent"
                        overlayClassName="OverlayModal"
                    >
                        <div id="modal" style={{ display: display }}>
                            <div style={{ display: "flex" }}>
                                <span className="material-icons-outlined closeModal" onClick={() => setShow(false)}>close</span>
                            </div>
                            <div className="flexCategoriesModal">
                                {
                                    secondCategories.map(category => {
                                        return (
                                            <div key={category._id} onClick={() => getCurrentCategory(category._id)} className="category categoryModal">
                                            <Link to={`/category/${category._id}`} className="nameCategoryBanner">
                                                <div className="imageCategoryBanner" style={{ backgroundImage: `url('${category.imageCategory}')` }}></div>
                                            </Link>
                                                <span className="nameCategorySpan">{category.nameCategory}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        categories: state.categoryReducer.categories,
    }
}
const mapDispatchToProps = {
    getCurrentCategory: categoryActions.getCurrentCategory
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesBanner)