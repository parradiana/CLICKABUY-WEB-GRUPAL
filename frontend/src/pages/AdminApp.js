import adminAppActions from '../redux/actions/adminAppActions'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import Header from '../components/Header'





const AdminApp = (props) => {

    const { userLogged, getAllRequest, approveRequest, rejectRequest } = props
    const [requests, setRequests] = useState(null);

    /*const fetchAPIGetAllRequest = async () => {
        
    }*/

    useEffect(() => {
        getAllRequest(userLogged.token)
            .then(res => setRequests(res))
            .catch(err => { console.log(err) })
    }, [])

    if (!requests) return <h1>Loading ...</h1>

    const respondRequest = async (request, type) => {
        let functionReference = type === "approve" ? approveRequest : rejectRequest;

        let data = await functionReference(userLogged.token, request._id);
        if (data.success) {
            let newRequests = requests.filter(req => req._id !== request._id)
            setRequests(newRequests)
        }

    }

    return (
        <>
            <Header />
            <div className="body" style={{backgroundColor: '#eeeeee'}}>

            <div className="adminAppHeader">
                    <div onClick={props.history.goBack} style={{ cursor: 'pointer' }} className="backToHome"><span className="material-icons-outlined iconBack">arrow_back_ios_new</span> Back</div>
                    <span className="myAdminAppTitle" > NEW STORES REQUESTS</span>
                </div>
                {requests.map(request => {
                    // { console.log(request) }
                    return (
                        <div key={request._id} className="adminAppCard">

                            <div className="adminAppStoreImg" style={{ backgroundImage: `url('${request.logoStore.url}')` }} ></div>

                            <div className="adminAppStoreInfo">

                                <div className="adminAppStoreInfoStore">
                                    <span>Store:  {request.nameStore}</span>
                                    <span>Category: {request.category.nameCategory}</span>
                                </div>
                                <div className="adminAppStoreInfoUser">
                                    <span>Author:</span>
                                    {/* <div className="adminAppUserImg"  style={{ backgroundImage: `url('${request.userOfRequest.userImg.url}')` }}></div> */}
                                    <span> {`${request.userOfRequest.firstName} ${request.userOfRequest.lastName}`}</span>
                                </div>
                            </div>

                            <div className="adminAppStoreButtons">
                                <button onClick={() => respondRequest(request, "approve")}>Accept</button>
                                <button onClick={() => respondRequest(request, "reject")}>Decline</button>
                            </div>

                        </div>
                    )
                })}

            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        userLogged: state.authReducer.userLogged,
    }
}

const mapDispatchToProps = {
    getAllRequest: adminAppActions.getAllRequest,
    approveRequest: adminAppActions.approveRequest,
    rejectRequest: adminAppActions.rejectRequest,
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminApp)