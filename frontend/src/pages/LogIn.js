import React from "react";
import ReactDOM from "react-dom";
import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import authActions from "../redux/actions/authActions";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import { FaTags } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

const validationSchema = yup.object({
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

  /* password:joi.string().min(6).trim().required().pattern(/(?=.*\d)(?=.*[A-z])/).messages({
      "string.empty":"This field is mandatory",
      "string.pattern.base": "Your password must be at least 6 characters long, contain a capital letter, minuscule letter and number",
      "string.min": "Your password must be at least 6 characters long" */
});

const LogIn = (props) => {
  const [pbStatus, setPBStatus] = useState(25);
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  const respuestaGoogle = (response) => {
    const { givenName, familyName, email, googleId, imageUrl } = response.profileObj;
    props.logInUser({
      email: email,
      password: "a" + googleId,
    });

    props.history.push("/");
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      /*  alert(JSON.stringify(values, null, 2)); */
      props.logInUser(values);
      props.history.push("/");
    },
  });

  return (
    <div className="contenedorSignUp">
      <video src="./assets/videoUserAccount.mp4" autoPlay loop muted className="videoForm"></video>
        <Link to="/" className="backToHome"><span className="material-icons-outlined iconBack">arrow_back_ios_new</span> Back</Link>
      <div className="contenedorInfoForm">
        <div className="contenedorLogoForm">
          <FaTags className="logoForm" />
          <h1>clickabuy</h1>
          <span className="fraseClickabuy">YOU NEED IT, YOU WANT IT, WITH CLICKABUY YOU CAN HAVE IT</span>
            <span className="linkLogInText">Don't have an account?</span><Link to="/SignUp" className="bussinesAccount">Sign Up</Link>
        </div>
        <div className="contenedorFormLogIn">
        <h2>Welcome Back!</h2>
        <form onSubmit={formik.handleSubmit} className="formulario">
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
          <Button variant="contained" fullWidth type="submit">Log In</Button>
        </form>
        <div>
          <GoogleLogin
            clientId="453615867535-mmnqpnp68m7du525dnif9647ll1bssi5.apps.googleusercontent.com"
            render={renderProps => (
              <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="bGoogle"><FcGoogle className="iconGoogle" /> Log In with Google</button>
            )}
            onSuccess={respuestaGoogle}
            onFailure={respuestaGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        </div>
        {/* secreto google esu21qkgDbOgSQKwu8JWeBFb */}

          </div>
      </div>
  );
};
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  logInUser: authActions.logInUser,
};
export default connect(null, mapDispatchToProps)(LogIn);
/* export default SignIn; */
