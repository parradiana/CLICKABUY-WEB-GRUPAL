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
  // category: yup.string().required("category is required!"),

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

  if (props.storesByUser.length > 0) {
    var thisStore = props.storesByUser.find(store => store._id === props.match.params.id)
  }

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
      price: "",
      stock: "",
      description: "",
      // category: "",
      productImg: "",

    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      // alert(ta.description);
      let formData = new FormData();

      console.log(photo.userImg)

      formData.append("nameProduct", values.bName);
      formData.append("price", values.price);
      formData.append("stock", values.stock);
      formData.append("description", ta.description);
      formData.append("storeId", props.match.params.id);

      formData.append("productImg", photo.userImg);

      // console.log("soy el values", values);
      console.log("soy el Formdata", formData);

      // console.log(formData)
      props.addProduct(props.userLogged.token, formData)

      // sendInfoProd(formData)

      props.history.goBack()
    },
  });

  // const sendInfoProd = async (formData) => {
  //   const response = await props.addProduct(props.userLogged.token, formData)
  //   console.log(response)
  // }

  const cargarFoto = (e) => {
    setPhoto({ userImg: e.target.files[0] });
    setPhotoName({ userImgName: e.target.files[0].name });
  };

  const cargarTA = (e) => {
    setTA({ description: e.target.value });
  };


  return (
    <div className="contenedorSignUp">

        {/* <video src="./assets/formVideo.mp4" autoPlay loop muted className="videoForm"></video> */}
        {/* <div className="contenedorHeaderSignUp"> */}
        <div onClick={props.history.goBack} className="backToHome" style={{ cursor: 'pointer' }}><span className="material-icons-outlined iconBack">arrow_back_ios_new</span> Back</div>
        {/* </div> */}
        <div className="contenedorProductAddFromStore">

        <div className="contenedorFormAdminStore">
          <div className="contenedorInfoFormAdminStore">
            <h3 className="tituloAdminStore">Add a new product to your store!</h3>
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
                label="Product name"
                value={formik.values.bName}
                onChange={formik.handleChange}
                error={formik.touched.bName && Boolean(formik.errors.bName)}
                helperText={formik.touched.bName && formik.errors.bName}
              />
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.bName && Boolean(formik.errors.bName)}
                helperText={formik.touched.bName && formik.errors.bName}
              />
              <TextField
                fullWidth
                id="stock"
                name="stock"
                label="Stock"
                value={formik.values.stock}
                onChange={formik.handleChange}
                error={formik.touched.bName && Boolean(formik.errors.bName)}
                helperText={formik.touched.bName && formik.errors.bName}
              />

              {/* <select
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                className="selectSignUpStore"
              >
                <option value="" label="Select a category" />
                {props.categories.map((category) => {
                  return <option value={category._id} label={category.nameCategory} />;
                })}
              </select> */}

              <textarea placeHolder="Description of your product" onChange={(e) => cargarTA(e)} className="textareaSignUpStore"></textarea>
              <div className="contenedorInputFile">
                <label htmlFor="userImg" className="buttonInputFile">
                  <span className="material-icons-outlined iconCamera">add_a_photo</span> UPLOAD PRODUCT IMAGE
                  <input id="userImg" name="userImg" type="file" style={{ display: "none" }} onChange={cargarFoto} />
                </label>
                <span>{photoName.userImgName}</span>
              </div>
              <Button variant="contained" fullWidth type="submit">Upload the new Product</Button>
            </form>
          </div>
        </div>
      </div>
        </div>
    // </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categoryReducer.categories,
    userLogged: state.authReducer.userLogged,
    storesByUser: state.adminStoreReducer.storesByUser

  };
};

const mapDispatchToProps = {
  addProduct: adminStoreActions.addProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpStore);
