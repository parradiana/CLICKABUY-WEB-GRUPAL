import React from "react";
import ReactDOM from "react-dom";
import { useFormik, Form } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import { FcGoogle } from "react-icons/fc";
import TextField from "@material-ui/core/TextField";
import authActions from "../redux/actions/authActions";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
// import "../gracia.css";
import { FaTags } from "react-icons/fa";
import { useEffect, useState } from "react";

const validationSchema = yup.object({
  firstName: yup
    .string("Enter a valid name")
    .required("Name is required")
    .min(2, "Your name must contain at least 2 letters")
    .max(20, "Your name can’t contain more than 20 letters.")
    .trim()
    .required("This field is mandatory")
    .matches(new RegExp("[a-zA-Z]$"), "This field can only contain letters"),

  lastName: yup
    .string("Enter a valid last name")
    .required("Name is required")
    .trim()
    .min(3, "Your last name must contain at least 3 letters")
    .max(20, "Your last name cannot contain more than 20 letters")
    .matches(new RegExp("[a-zA-Z]$"), "This field can only contain letters"),

  email: yup
    .string("Enter a valid email address")
    .trim()
    .email("Enter a valid email")
    .required("This field is mandatory"),

  password: yup
    .string("Enter your password")
    .min(6, "Your password must be at least 6 characters long")
    .trim()
    .required("Password is required")
    .matches(
      /(?=.*\d)(?=.*[A-z])/,
      "Your password must be at least 6 characters long, contain a capital letter, minuscule letter and number"
    ),
});

const SignUp = (props) => {
  const [photo, setPhoto] = useState({ userImg: "" });
  const [photoName, setPhotoName] = useState({ userImgName: "" });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const respuestaGoogle = (response) => {
    const { givenName, familyName, email, googleId, imageUrl } = response.profileObj;
    // console.log({
    //   loggedWithGoogle: true,
    //   firstName: givenName,
    //   lastName: familyName,
    //   userImg: imageUrl,
    //   email: email,
    //   password: "a" + googleId,
    // });

    let formData = new FormData();
    formData.append("loggedWithGoogle", true);
    formData.append("firstName", givenName);
    formData.append("lastName", familyName);
    formData.append("email", email);
    formData.append("password", "a" + googleId);
    formData.append("userImg", imageUrl);
    props.signUpUser(formData);
    //props.history.push("/");
  };

  const formik = useFormik({
    initialValues: {
      loggedWithGoogle: false,
      firstName: "",
      lastName: "",
      userImg: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let formData = new FormData();
      formData.append("loggedWithGoogle", values.loggedWithGoogle);
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("userImg", photo.userImg);
      props.signUpUser(formData);
    },
  });

  const cargarFoto = (e) => {
    setPhoto({ userImg: e.target.files[0] });
    /*  console.log("soy el e", e.target.files[0].name); */
    setPhotoName({ userImgName: e.target.files[0].name });
  };

  return (
    <div className="contenedorSignUp">
      <video src="./assets/videoUserAccount2.mp4" autoPlay loop muted className="videoForm"></video>
      <Link to="/" className="backToHome">
        <span className="material-icons-outlined iconBack">arrow_back_ios_new</span> Back
      </Link>
      <div className="contenedorInfoForm">
        <div className="contenedorLogoForm">
          <FaTags className="logoForm" />
          <h1>clickabuy</h1>
          <span className="fraseClickabuy">YOU NEED IT, YOU WANT IT, WITH CLICKABUY YOU CAN HAVE IT</span>
          <span className="linkLogInText"> Already have an account?</span>
          <Link to="/login" className="bussinesAccount">Log In</Link>
        </div>
        <div className="contenedorForm">
          <h2>Register</h2>

          <form onSubmit={formik.handleSubmit} className="formulario">
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="Firstname"
              autoComplete="off"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Lastname"
              autoComplete="off"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />

            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              autoComplete="off"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="off"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <div className="contenedorInputFile">
              <label htmlFor="userImg" className="buttonInputFile">
                <span className="material-icons-outlined iconCamera">add_a_photo</span> CHOOSE A PROFILE PICTURE
                  <input id="userImg" name="userImg" type="file" style={{ display: "none" }} onChange={cargarFoto} />
              </label>
              <span>{photoName.userImgName}</span>
            </div>
            {/* <div>
              <label htmlFor="userImg" className="buttonInputFile">
                Choose Your Image
                <input id="userImg" name="userImg" type="file" style={{ display: "none" }} onChange={cargarFoto} />
              </label>
              <span>{photoName.userImgName}</span>
            </div> */}
            <Button variant="contained" type="submit">
              Sign Up
            </Button>
          </form>
          <div>
            <GoogleLogin
              clientId="453615867535-mmnqpnp68m7du525dnif9647ll1bssi5.apps.googleusercontent.com"
              render={(renderProps) => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="bGoogle">
                  <FcGoogle className="iconGoogle" /> Sign Up with Google
                </button>
              )}
              buttonText="Sign Up with Google"
              onSuccess={respuestaGoogle}
              onFailure={respuestaGoogle}
              cookiePolicy={"single_host_origin"}
            />
            {/* secreto google esu21qkgDbOgSQKwu8JWeBFb */}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

const mapDispatchToProps = {
  signUpUser: authActions.signUpUser,
};

export default connect(null, mapDispatchToProps)(SignUp);
