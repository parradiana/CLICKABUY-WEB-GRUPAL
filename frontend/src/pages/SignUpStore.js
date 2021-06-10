import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import storeActions from "../redux/actions/storeActions";
import { FiCamera } from 'react-icons/fi'
import adminStoreActions from "../redux/actions/adminStoreActions";

const validationSchema = yup.object({

  bName: yup.string("Enter business name").required("Business Name is required"),
  category: yup.string().required("category is required!"),

});
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SignUpStore = (props) => {
  const classes = useStyles();
  /*  console.log(props.categories); */
  const { userLogged } = props
  const [photo, setPhoto] = useState({ userImg: "" });
  const [photoName, setPhotoName] = useState({ userImgName: "" });
  const [ta, setTA] = useState({ description: "" });
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const formik = useFormik({
    initialValues: {

      bName: "",
      description: "",
      category: "",
      storeLogo: "",

    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      // alert(ta.description);
      let formData = new FormData();

      formData.append("nameStore", values.bName);
      formData.append("description", ta.description);
      formData.append("idCategory", values.category);

      formData.append("logoStore", photo.userImg);

      props.addRequest(props.userLogged.token, formData);
      props.history.goBack()
    },
  });

  const cargarFoto = (e) => {
    setPhoto({ userImg: e.target.files[0] });
    setPhotoName({ userImgName: e.target.files[0].name });
  };

  const cargarTA = (e) => {
    /* console.log("TA",e.nativeEvent.data) */

    setTA({ description: e.target.value });
  };


  return (
    <div className="contenedorSignUp">
      <video src="./assets/videoBuissnessAccount.mp4" autoPlay loop muted className="videoForm"></video>

      {/* <video src="./assets/formVideo.mp4" autoPlay loop muted className="videoForm"></video> */}
      {/* <div className="contenedorHeaderSignUp"> */}
      <div onClick={props.history.goBack} style={{ cursor: 'pointer' }} className="backToHome"><span className="material-icons-outlined iconBack">arrow_back_ios_new</span> Back</div>

      {/* </div> */}
      <div className="contenedorFormAdminStore">
        <div className="contenedorInfoFormAdminStore">
          <h3>Hello {userLogged.firstName}! Complete the following details to create a Business Account</h3>
          {/* <Link to="/SignUp" className="linkPersonAccount">
              <div className="d-flex justify-content-end">
                <label className="personAccount">Create a person account </label>
              </div>
            </Link> */}
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="bName"
              name="bName"
              label="Business name"
              value={formik.values.bName}
              onChange={formik.handleChange}
              error={formik.touched.bName && Boolean(formik.errors.bName)}
              helperText={formik.touched.bName && formik.errors.bName}
            />
            <select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              className="selectSignUpStore"
            >
              <option value="" label="Select a category" />
              {props.categories.map((category) => {
                return <option value={category._id} label={category.nameCategory} />;
              })}
            </select>
            <textarea placeholder="Description of your business (optional)" onChange={(e) => cargarTA(e)} className="textareaSignUpStore"></textarea>
            <div className="contenedorInputFile">
              <label htmlFor="userImg" className="buttonInputFile">
                <span className="material-icons-outlined iconCamera">add_a_photo</span> UPLOAD STORE'S LOGO
                  <input id="userImg" name="userImg" type="file" style={{ display: "none" }} onChange={cargarFoto} />
              </label>
              <span>{photoName.userImgName}</span>
            </div>
            <Button variant="contained" fullWidth type="submit">Create a new Store</Button>
          </form>
        </div>
      </div>
    </div >
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categoryReducer.categories,
    userLogged: state.authReducer.userLogged
  };
};

const mapDispatchToProps = {
  addRequest: adminStoreActions.addRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpStore);
