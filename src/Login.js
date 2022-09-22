import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [isLoginPage, setIsLoginPage] = useState(true)
  const [url, setUrl] = useState('')
  let navigate = useNavigate();

  useEffect(() => {
    let href = window.location.href
    setUrl(href)
    if(href.includes('register'))
      setIsLoginPage(false)
  },[url,isLoginPage])

  return (
    <div className='text-center'>
     <h1>{isLoginPage? 'Login to start shopping!' : 'Sign Up'}</h1>
     <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         return errors;
       }}
       onSubmit={async(values, { setSubmitting }) => {
         if(isLoginPage){
            const requestOptions = {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(values)
            };
            const response = await fetch(' http://localhost:4000/api/users/login', requestOptions);
            const data = await response.json();
            if(data.success)
              navigate("/app", { replace: true });
              
        }
        else{
          const requestOptions = {
          method: 'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(values)
          };
          const response = await fetch(' http://localhost:4000/api/users/register', requestOptions);
          const data = await response.json();
          if(data.name == values.name){
            navigate("/login", { replace: true });
            setIsLoginPage(true)
          }

        }
          setSubmitting(false)
        }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
           {!isLoginPage && <div className='w-50 mb-15 label'>
              <label className='block' >Name</label>
              <input
                type="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                // className=' w-99'
              />
            </div>}

           <div className='w-50 mb-15 label'>
              <label className='block' >Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                // className=' w-99'
              />
            </div>
           
           {errors.email && touched.email && errors.email}
           <div className='w-50 mb-15 label'>
              <label className='block' >Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
            </div>
           
           {errors.password && touched.password && errors.password}
          {!isLoginPage && <div className='w-50 mb-15 label'>
              <label className='block' >Confirm Password</label>
              <input
                type="password"
                name="password2"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password2}
              />
            </div>}
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </form>
       )}
     </Formik>
   </div>
  )
}

export default Login