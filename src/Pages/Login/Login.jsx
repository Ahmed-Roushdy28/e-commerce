import React, { useContext, useState } from "react";
import style from "./Login.module.css"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
export default function Login() {
  let navigate = useNavigate()
  let {setuserLogin} = useContext(UserContext)
  const [apiError, setapiError] = useState("");
  const [isloading, setIsloading] = useState(false);

  let error = Yup.object().shape({
    email: Yup.string().email("email is invalid").required("email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,10}/,
        "password must start with capital letter and be atleast 5 characters and max 10"
      )
      .required("password is required"),
  });
  
  function handleLogin(formvalues) {
    setIsloading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formvalues)
      .then((apiResponse) => {
        if(apiResponse?.data?.message === 'success')
          localStorage.setItem('userToken' , apiResponse.data.message )
        setuserLogin(apiResponse.data.message)
        navigate('/');
        setIsloading(false);
        
      })
      .catch((apiResponse) => {
        setIsloading(false), setapiError(apiResponse?.response?.data?.message);
      });
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema: error,
  });
  return (
    <>
      <div className="mx-auto py-6 max-w-xl">
      <h1 className=" text-3xl mb-5 font-bold text-green-700">Register Now</h1>
        <h2 className="font-bold text-green-600"></h2>
        {apiError && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {apiError}
          </div>
        )}
        <form onSubmit={formik.handleSubmit} className="max-w-xl">
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : null}
          <div className="flex">
            <button
              type="submit"
              className="text-white mr-auto bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {
                isloading?<i className="fa fa-spinner fa-spin"></i>:'submit'
              }
              
            </button>
            <small className="ml-auto my-auto">Don't have an email yet ? <Link to={'/register'} className="text-green-700 underline-offset-4 underline font-bold">Register Now</Link></small>
          </div>
        </form>
      </div>
    </>
  );
}
// let navigate = useNavigate();
//   async function handleRegister(formValues) {
//     let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , formValues)
//     if (data.message === "success"){
//       navigate('/')
//     }else{

//     }
//   }
//   let formik = useFormik({
//     initialValues:{
// name:'',
// email:'',
// password:'',
// rePassword:'',
// phone:''
//     },
//     onSubmit:handleRegister
//   })

// let navigate = useNavigate();
// async function handleRegister(formvalues) {
//   let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , formvalues)
//   if (data.message === 'success'){
//     navigate('/')
//   }
// }
