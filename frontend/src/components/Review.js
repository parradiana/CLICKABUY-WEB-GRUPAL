import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import { TiDelete } from 'react-icons/ti'
import { IoSend } from 'react-icons/io5'
import ReactStars from 'react-stars'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Comment = (props) => {
    const { review, updatedReview, deleteReviews, userLogged, productSelected } = props
    const [reviewContent, setReviewContent] = useState(review.review)
    const [visible, setVisible] = useState(false)
    const [enabledUser, setEnabledUser] = useState(false)
    const [updateReview, setUpdateReview] = useState(false)

    useEffect(() => {
        if (userLogged && userLogged.email === review.userId.email) {
            setEnabledUser(true)
        }
    }, [])
    const sendEnter = (e) => {
        if (e.key === 'Enter') {
            updatedReview(reviewContent, review._id)
            setVisible(false)
            setReviewContent(!reviewContent)
        }
    }
    alert = () => {
        MySwal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this review!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.value) {
                MySwal.fire(
                'Deleted!',
                'Your review has been deleted.',
                'success'
              ).then(
                deleteReviews(review._id)
              )
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                MySwal.fire(
                'Cancelled',
                'Your review is safe :)',
                'error'
              )
            }
          })
    }

    return (
        <div className="contenedorInfo">
            <div className="datosUserReview">

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 40 }}>

                    {
                        !updateReview
                        && <ReactStars
                            // onChange={(e) => setStarState(e)}
                            count={5}
                            size={32}
                            isHalf={true}
                            edit={false}
                            color2="#EA957F"
                            color1="#555555"
                            value={review.vote}
                        />

                    }
                    {
                        updateReview
                        && <ReactStars
                            // onChange={(e) => setStarsEdit(e)}
                            count={5}
                            size={32}
                            isHalf={true}
                            edit={true}
                            color2="#EA957F"
                            color1="#555555"
                            value={0}
                        />
                    }

                </div>

                <div>
                    <p>{review.userId.firstName} {review.userId.lastName}</p>
                </div>

            </div>
            <div className="contenedorReview">
                {!updateReview
                    ? <div className="nameReview">
                        <p>{review.review}</p>
                    </div>
                    : <div className="contenedorInputEdit">
                        <input type="text" value={reviewContent} onChange={e => setReviewContent(e.target.value)} onKeyDown={sendEnter} />
                        <IoSend className="iconSendEdit" onClick={() => { updatedReview(reviewContent, review._id); setVisible(false); setUpdateReview(!updateReview) }} />
                    </div>
                }
                {
                    enabledUser &&
                    <div className="contenedorButtonsOptions">
                        <div onClick={() => { setUpdateReview(!updateReview) }}>
                            {!updateReview ? <FaPencilAlt /> : <TiDelete />}
                        </div>
                        <FaTrashAlt onClick={() => alert()}></FaTrashAlt>
                    </div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged
    }
}
export default connect(mapStateToProps)(Comment)